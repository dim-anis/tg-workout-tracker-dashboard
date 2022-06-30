import styled from "styled-components";

import DashboardTile from "../components/DashboardTile";
import ItemComponent from "../components/itemComponent";
import WorkoutSets from "../components/WorkoutSets";

import useFetch from "../hooks/useFetch";

import { findNLastWorkouts, dateToString } from "../utils";

import LoadingIcon from "../components/LoadingIcon";
import { ReactComponent as BodyIcon } from "../images/icons/body.svg";
import LineChart from "../components/LineChart";

const ErrorMessage = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: row1-start;
  grid-row-end: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 1rem 2rem;

  @media (max-width: 560px) {
    padding: 1rem 0.5rem;
  }
`;

const StyledTD = styled.th`
  text-align: ${props => props.align || 'left'};
  padding: 0.5rem;
`;

const StyledTH = styled.th`
  padding: 0.5rem;
  color: var(--text-light-lightest);
  text-align: ${props => props.align || 'left'}
`;

const StyledTR = styled.tr`
  &:hover {
    background-color: var(--bg-light-muted);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledH2 = styled.h2`
  width: 100%;
  text-align: left;
  font-size: 2rem;
  margin: 0;
  margin-bottom: 1rem;
  
  @media (max-width: 560px) {
    font-size: 1.5rem;
  }
`;

// const Container = styled.div`
//   display: flex;
//   @media (max-width: 560px) {
//     flex-direction: column;
//   }
// `;

// const WorkoutContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
// `;

// const Title = styled.h2`
//   align-self: start;
//   padding: 1rem;
//   font-size: 2rem;
//   margin-block: 1rem;
// `;

// const DayTitle = styled.h3`
//   margin: 0;
// `;

const Cube = () => {
  
  const url = "https://tg-workout-tracker-dashboard.herokuapp.com/stats";
  //"http://192.168.31.38:5000/stats"
  const { data, isLoading, isError } = useFetch(url);

  if (isError) { return <ErrorMessage>{isError.message}</ErrorMessage>};
  if (typeof data === "undefined") { return <ErrorMessage><LoadingIcon /></ErrorMessage> };

  const lastWorkout = findNLastWorkouts(1, data);

  const lastSevenWorkouts = findNLastWorkouts(16, data);
  
  //formatting data for nivo line chart
  const rpeChartData = lastSevenWorkouts.map((arr) => ({
    x: dateToString(arr[0].createdAt), 
    y: (arr.reduce((days, workout) => days + workout.rpe, 0) / arr.length).toPrecision(2)})
  );

  //const averageRPE = 

  return (
    <>
      <DashboardTile>
        <ItemComponent
          title={"CURRENT SPLIT"}
          data={"4 Day"}
          icon={ <BodyIcon /> }
        >
        </ItemComponent>
      </DashboardTile>
      <DashboardTile 
        span={"1 / span 3"}
        >
        <LineChart 
          data={rpeChartData}
          title={"Average RPE"}
          titleValue={8} // add dynamic
          xValueType={"Date"}
          yValueType={"RPE"}
          margin={{ top: 10, right: 20, bottom: 30, left: 30 }}
        />
      </DashboardTile>
      <DashboardTile span={"1 / span 3"}>
        <TableContainer>
          <StyledH2>Last Workout</StyledH2>
          <StyledTable>
            <thead>
              <tr>
                <StyledTH>Exercise</StyledTH>
                <StyledTH>Weight</StyledTH>
                <StyledTH>Reps</StyledTH>
                <StyledTH align={'right'}>RPE</StyledTH>
              </tr>
            </thead>
            <tbody>
              {lastWorkout.at(-1).map(set => (
                <StyledTR>
                  <StyledTD>{set.exercise}</StyledTD>
                  <StyledTD>{set.weight}</StyledTD>
                  <StyledTD>{set.repetitions}</StyledTD>
                  <StyledTD align={'right'}>{set.rpe}</StyledTD>
                </StyledTR>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </DashboardTile>
    </> 
   );
}
 
export default Cube;