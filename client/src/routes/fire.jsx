import styled from "styled-components";

import WorkoutTable from "../components/WorkoutsTable/WorkoutTable";
import WorkoutItem from "../components/WorkoutsTable/WorkoutItem";
import DashboardTile from "../components/DashboardTile";
import { FetchResultContainer } from "../components/Dashboard";
import LoadingIcon from "../components/LoadingIcon";

import useFetch from "../hooks/useFetch";
import { Navigate } from "react-router-dom";

const TileTitle = styled.h2`
  font-size: var(--fs-600);
  margin: 1rem 0rem;
  color: ${(props) => props.theme.textColor};
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  margin-top: 1rem;
`;

const Fire = () => {
  const { data, isError } = useFetch("/stats");

  if (isError?.response?.status === 401) {
    return <Navigate to="/signin" />;
  } else if (isError) {
    return <FetchResultContainer>{isError.message}</FetchResultContainer>;
  }

  if (!data) {
    return (
      <FetchResultContainer>
        <LoadingIcon />
      </FetchResultContainer>
    );
  }

  return (
    <DashboardTile
      gColumn={"1 / -1"}
      alignItems="stretch"
      flexDirection={"column"}
    >
      <TileTitle>Latest Workouts</TileTitle>
      <h3>August</h3>
      <WorkoutTable>
        <WorkoutItem name={"Title"} date={"21/08"} />
        <WorkoutItem name={"Title"} date={"21/08"} />
        <WorkoutItem name={"Title"} date={"21/08"} />
      </WorkoutTable>
      <h3>September</h3>
      <WorkoutTable>
        <WorkoutItem name={"Title"} date={"21/09"} />
        <WorkoutItem name={"Title"} date={"21/09"} />
        <WorkoutItem name={"Title"} date={"21/09"} />
      </WorkoutTable>
      <StyledButton>Add workout</StyledButton>
    </DashboardTile>
  );
};

export default Fire;
