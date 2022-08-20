import { useState } from "react";
import styled from "styled-components";

import DashboardTile from "../components/DashboardTile";
import LoadingIcon from "../components/LoadingIcon";
import LineChart from "../components/LineChart";
import { FetchResultContainer } from "../components/Dashboard";

import useFetch from "../hooks/useFetch";

const TableContainer = styled.div`
  width: 100%;
  height: 50vh;
  overflow-y: auto;
`;

const StyledTD = styled.td`
  text-align: ${(props) => props.align || "left"};
  padding: 0.5rem;
`;

const StyledTH = styled.th`
  //display: block;
  //width: 100%;
  padding: 0.5rem;
  color: var(--text-light-lightest);
  text-align: ${(props) => props.align || "left"};
`;

const StyledTR = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fs-400);
`;

const StyledTBody = styled.tbody`
  //display: block;
  overflow-y: scroll;
  //width: 100%;
`;

const StyledH2 = styled.h2`
  width: 100%;
  text-align: left;
  font-size: var(--fs-600);
`;

const ColorCode = styled.em`
  background-color: ${(props) =>
    props.color === "yellow"
      ? props.theme.colorHighlightBgYellow
      : props.color === "red"
      ? props.theme.colorHighlightBgRed
      : props.color === "green"
      ? props.theme.colorHighlightBgGreen
      : "transparent"};
  color: ${(props) =>
    props.color === "yellow"
      ? props.theme.colorHighlightYellow
      : props.color === "red"
      ? props.theme.colorHighlightRed
      : props.color === "green"
      ? props.theme.colorHighlightGreen
      : "transparent"};
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  font-style: normal;
`;

const Cube = () => {
  // "https://tg-workout-tracker-dashboard.herokuapp.com/stats";

  const { data: workoutData, isError } = useFetch(`/stats`);
  const [period, setPeriod] = useState(16);

  if (isError) {
    return <FetchResultContainer>{isError.message}</FetchResultContainer>;
  }

  if (!workoutData) {
    return (
      <FetchResultContainer>
        <LoadingIcon />
      </FetchResultContainer>
    );
  }

  const lastWorkout = workoutData.at(-1).sets;

  const selectPeriod = workoutData.slice(-period);

  const rpePerWorkout = (sets) =>
    sets.reduce((total, set) => total + set.rpe, 0) / sets.length;

  const chartData = selectPeriod.map((workout) => ({
    x: workout.date,
    y: +rpePerWorkout(workout.sets).toPrecision(2),
  }));

  const last4Workouts = chartData.slice(-4);

  const rpeThisMonth = (
    last4Workouts.reduce((total, rpe) => total + rpe.y, 0) / 4
  ).toFixed(1);

  return (
    <>
      <DashboardTile
        gColumn={"1 / -1"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <LineChart
          height={"75%"}
          data={chartData}
          title={"AVERAGE RPE"}
          titleValue={rpeThisMonth}
          yValueUnit={"RPE"}
          xValueType={"Date"}
          yValueType={"RPE"}
          margin={{ top: 25, right: 40, bottom: 50, left: 40 }}
          setPeriod={setPeriod}
        />
      </DashboardTile>
      <DashboardTile gColumn={"1 / -1"} flexDirection={"column"}>
        <StyledH2>Last workout</StyledH2>
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <StyledTH>Exercise</StyledTH>
                <StyledTH>Weight</StyledTH>
                <StyledTH>Reps</StyledTH>
                <StyledTH align={"right"}>RPE</StyledTH>
              </tr>
            </thead>
            <StyledTBody>
              {lastWorkout.map((set, i) => (
                <StyledTR key={i}>
                  <StyledTD>{set.exercise}</StyledTD>
                  <StyledTD>{set.weight}</StyledTD>
                  <StyledTD>{set.repetitions}</StyledTD>
                  <StyledTD align={"right"}>
                    {set.rpe > 8 ? (
                      <ColorCode color={"red"}>{set.rpe}</ColorCode>
                    ) : set.rpe > 7 && set.rpe <= 8 ? (
                      <ColorCode color={"yellow"}>{set.rpe}</ColorCode>
                    ) : (
                      <ColorCode color={"green"}>{set.rpe}</ColorCode>
                    )}
                  </StyledTD>
                </StyledTR>
              ))}
            </StyledTBody>
          </StyledTable>
        </TableContainer>
      </DashboardTile>
    </>
  );
};

export default Cube;
