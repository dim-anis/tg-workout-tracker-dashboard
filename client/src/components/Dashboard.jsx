import React, { useState, useRef } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import format from "date-fns/format";

import Modal from "./Modal";
import { StyledInput } from "../pages/signin";
import ItemComponent from "./ItemComponent";
import LineChart from "./LineChart";
import DashboardTile from "./DashboardTile";
import LoadingIcon from "./LoadingIcon";

import { ReactComponent as IconBulb } from "../images/icons/bulb.svg";
import { ReactComponent as IconCalendar } from "../images/icons/calendar.svg";
import { ReactComponent as IconCheckbox } from "../images/icons/checkbox.svg";
import { Navigate } from "react-router-dom";
import WorkoutItem from "./WorkoutsTable/WorkoutItem";
import { useEffect } from "react";
import axios from "../api/axios";

const WEIGHT_REGEX = /^\d{1,3}$|^\d{1,3}\.\d{0,2}$/;
const REPETITIONS_REGEX = /^\d{1,2}$/;
const RPE_REGEX =
  /^[5-9]{1}$|^[5-9]{1}\.(5)$|^[5-9]{1}\.$|^[5-9]{1}\.(0)*$|^[1][0]$/;

export const FetchResultContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SetContainer = styled.div`
  width: 100%;
  max-height: 30vh;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
`;

const H2 = styled.h2`
  width: 100%;
  text-align: left;
  margin-bottom: 1rem;
  font-weight: normal;
  font-size: var(--fs-600);
  color: ${(props) => props.theme.textColorSecondary};
`;

const HelperMessage = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colorHighlightRed};
  font-size: var(--fs-200);
  text-align: left;
`;

const InputContainer = styled.div``;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  font-size: var(--fs-400);
`;

const Dashboard = () => {
  const { data: workoutData, isError, setData } = useFetch(`/stats`);
  const [lastWorkout, setLastWorkout] = useState({});
  
  const errorRef = useRef();

  const [period, setPeriod] = useState(16);
  const [set, setSet] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [validWeight, setValidWeight] = useState(false);
  const [weightFocus, setWeightFocus] = useState(false);

  const [validRepetitions, setValidRepetitions] = useState(false);
  const [repetitionsFocus, setRepetitionsFocus] = useState(false);

  const [validRpe, setValidRpe] = useState(false);
  const [rpeFocus, setRpeFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = WEIGHT_REGEX.test(set.weight);
    setValidWeight(result);
  }, [set.weight]);

  useEffect(() => {
    const result = REPETITIONS_REGEX.test(set.repetitions);
    setValidRepetitions(result);
  }, [set.repetitions]);

  useEffect(() => {
    const result = RPE_REGEX.test(set.rpe);
    setValidRpe(result);
  }, [set.rpe]);

  if (isError?.response?.status === 401) {
    return <Navigate to="/signin" />;
  } else if (isError) {
    return <FetchResultContainer>{isError.message}</FetchResultContainer>;
  }

  if (!workoutData) {
    return (
      <FetchResultContainer>
        <LoadingIcon />
      </FetchResultContainer>
    );
  }

  // selecting last workout's date to display
  const lastWorkoutDate = format(new Date(workoutData.at(-1).date), "MMM d");
  const lastWeekOfWorkouts = workoutData.slice(-4);
  const secondToLastWeekOfWorkouts = workoutData.slice(-8, -4);
  const lastMonthOfWorkouts = workoutData.slice(-16);

  // a function that returns a reduced value of the total volume per workout
  const volumePerWorkout = (sets) =>
    sets.reduce((total, set) => total + set.weight * set.repetitions, 0);

  const rpePerWorkout = (sets) =>
    sets.reduce((total, set) => total + set.rpe, 0) / sets.length;

  const mesoStart = workoutData
    .filter((workout) => rpePerWorkout(workout.sets) < 7)
    .at(-1);

  // adding 1 to the index since the new meso starts after the deload
  const mesoIndex = workoutData.indexOf(mesoStart) + 1;

  const workoutsThisMeso = workoutData.slice(mesoIndex).length;

  const volumeThisWeek = lastWeekOfWorkouts.reduce(
    (totalVolume, workout) => totalVolume + volumePerWorkout(workout.sets),
    0
  );
  const volumeLastWeek = secondToLastWeekOfWorkouts.reduce(
    (totalVolume, workout) => totalVolume + volumePerWorkout(workout.sets),
    0
  );
  const volumeThisMonth = lastMonthOfWorkouts.reduce(
    (totalVolume, workout) => totalVolume + volumePerWorkout(workout.sets),
    0
  );

  const volumeThisMonthFormatted = new Intl.NumberFormat().format(
    Math.round(volumeThisMonth)
  );

  const volumeThisWeekFormatted = new Intl.NumberFormat().format(
    Math.round(volumeThisWeek)
  );

  const lastWorkoutSets = workoutData.at(-1).sets;

  const diff = (
    ((volumeThisWeek - volumeLastWeek) / volumeThisWeek) *
    100
  ).toFixed(1);

  const diffFormated = new Intl.NumberFormat().format(diff);

  const selectPeriod = workoutData.slice(-period);

  const chartData = selectPeriod.map((workout) => ({
    x: workout.date,
    y: Math.floor(volumePerWorkout(workout.sets)),
  }));

  const handleChange = (e) => {
    setSet({
      ...set,
      [e.target.name]: parseFloat(e.target.value) || undefined,
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSet({});
  };

  const handleOpen = (e) => {
    const setId = e.currentTarget.id;
    const setToEdit = lastWorkoutSets.filter((set) => set._id === setId);
    setSet({
      ...setToEdit[0],
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch("/stats", JSON.stringify(set), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const updatedSetIndex = workoutData.at(-1).sets.findIndex(element => element._id === set._id);
      const sets = workoutData.at(-1).sets;
      sets[updatedSetIndex] = set;
      setData([...workoutData.slice(0, -1), {...workoutData.at(-1), sets}])
      setIsModalOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        title={set.exercise}
      >
        <InputContainer>
          <Label htmlFor="weight">Weight</Label>
          <StyledInput
            type="number"
            id="weight"
            name="weight"
            aria-invalid={validWeight ? "false" : "true"}
            aria-describedby="weightmessage"
            valid={validWeight && set.weight}
            value={set.weight || ""}
            onChange={handleChange}
            onFocus={() => setWeightFocus(true)}
            onBlur={() => setWeightFocus(false)}
            min="1"
            max="999"
            step="any"
            required
          />
        </InputContainer>
        {weightFocus && !validWeight && (
          <HelperMessage id="weightmessage">
            Please enter a valid value between 1 and 999 <br />
          </HelperMessage>
        )}
        <InputContainer>
          <Label htmlFor="repetitions">Repetitions</Label>
          <StyledInput
            type="number"
            id="repetitions"
            name="repetitions"
            aria-invalid={validRepetitions ? "false" : "true"}
            aria-describedby="repmessage"
            valid={validRepetitions && set.repetions}
            value={set.repetitions || ""}
            onChange={handleChange}
            onFocus={() => setRepetitionsFocus(true)}
            onBlur={() => setRepetitionsFocus(false)}
            min="1"
            max="99"
            required
          />
        </InputContainer>
        {repetitionsFocus && !validRepetitions && (
          <HelperMessage id="repmessage">
            Please enter a valid value between 1 and 99 <br />
          </HelperMessage>
        )}
        <InputContainer>
          <Label htmlFor="rpe">RPE</Label>
          <StyledInput
            type="number"
            id="rpe"
            name="rpe"
            aria-invalid={validRpe ? "false" : "true"}
            aria-describedby="rpemessage"
            valid={validRpe && set.rpe}
            value={set.rpe || ""}
            onChange={handleChange}
            onFocus={() => setRpeFocus(true)}
            onBlur={() => setRpeFocus(false)}
            step="0.5"
            min="5"
            max="10"
            required
          />
        </InputContainer>
        {rpeFocus && !validRpe && (
          <HelperMessage id="rpemessage">
            Please enter a valid value between 5 and 10 (0.5 steps allowed: 5.5,
            6.5 etc.) <br />
          </HelperMessage>
        )}
      </Modal>
      <DashboardTile gColumn={"1 / -1"}>
        <LineChart
          height={"60%"}
          margin={{ top: 20, right: 40, bottom: 50, left: 40 }}
          data={chartData}
          title={`VOLUME THIS MONTH`}
          titleValue={volumeThisMonthFormatted}
          yValueUnit={"KG"}
          xValueType={"Date"}
          yValueType={"Volume"}
          setPeriod={setPeriod}
        />
      </DashboardTile>
      <DashboardTile justifyContent={"left"} alignItems={"center"}>
        <ItemComponent
          icon={<IconBulb />}
          data={volumeThisWeekFormatted}
          diff={diffFormated}
          title={"VOLUME THIS WEEK"}
        />
      </DashboardTile>
      <DashboardTile
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"left"}
      >
        <ItemComponent
          data={workoutsThisMeso}
          title={"WORKOUTS THIS MESOCYCLE"}
          icon={<IconCheckbox />}
        />
      </DashboardTile>
      <DashboardTile justifyContent={"left"} alignItems={"center"}>
        <ItemComponent
          icon={<IconCalendar />}
          data={lastWorkoutDate}
          title={"LAST WORKOUT"}
        />
      </DashboardTile>
      <DashboardTile gColumn={"1 / -1"} flexDirection={"column"}>
        <H2>History</H2>
        <SetContainer>
          {workoutData.at(-1).sets.map((workout) => (
            <WorkoutItem
              _id={workout._id}
              id={workout._id}
              name={workout.exercise}
              rpe={`RPE: ${workout.rpe}`}
              weight={workout.weight}
              handleClick={handleOpen}
            />
          ))}
        </SetContainer>
      </DashboardTile>
    </>
  );
};

export default Dashboard;
