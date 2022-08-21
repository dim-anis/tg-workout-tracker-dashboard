import React, { useState } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import format from "date-fns/format";

import ItemComponent from "./ItemComponent";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DashboardTile from "./DashboardTile";
import LoadingIcon from "./LoadingIcon";

import { ReactComponent as IconBulb } from "../images/icons/bulb.svg";
import { ReactComponent as IconCalendar } from "../images/icons/calendar.svg";
import { ReactComponent as IconCheckbox } from "../images/icons/checkbox.svg";
import { Navigate } from "react-router-dom";
import WorkoutItem from "./WorkoutsTable/WorkoutItem";

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

const Dashboard = () => {
  const { data: workoutData, isError } = useFetch(`/stats`);
  const [period, setPeriod] = useState(16);

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

  const diff = (
    ((volumeThisWeek - volumeLastWeek) / volumeThisWeek) *
    100
  ).toFixed(1);

  const selectPeriod = workoutData.slice(-period);

  const chartData = selectPeriod.map((workout) => ({
    x: workout.date,
    y: Math.floor(volumePerWorkout(workout.sets)),
  }));

  const pieChartData = [
    {
      id: "done",
      label: "done",
      value: workoutsThisMeso,
    },
    {
      id: "left",
      label: "left",
      value: 20 - workoutsThisMeso,
    },
  ];

  return (
    <>
      <DashboardTile gColumn={"1 / -1"}>
        <LineChart
          height={"60%"}
          margin={{ top: 20, right: 40, bottom: 50, left: 40 }}
          data={chartData}
          title={`VOLUME THIS MONTH`}
          titleValue={new Intl.NumberFormat().format(volumeThisMonth)}
          yValueUnit={"KG"}
          xValueType={"Date"}
          yValueType={"Volume"}
          setPeriod={setPeriod}
        />
      </DashboardTile>
      <DashboardTile justifyContent={"left"} alignItems={"center"}>
        <ItemComponent
          icon={<IconBulb />}
          data={new Intl.NumberFormat().format(volumeThisWeek)}
          diff={new Intl.NumberFormat().format(diff)}
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
        <progress max={20} value={workoutsThisMeso}>
          {workoutsThisMeso}
        </progress>
        {/* <PieChart
          data={pieChartData}
          total={20}
          title={"WORKOUTS THIS MESOCYCLE"}
        /> */}
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
              id={workout._id}
              name={workout.exercise}
              date={`RPE: ${workout.rpe}`}
              weight={workout.weight}
            />
          ))}
        </SetContainer>
      </DashboardTile>
    </>
  );
};

export default Dashboard;
