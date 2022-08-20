import DashboardTile from "../components/DashboardTile";
import ItemComponent from "../components/ItemComponent";

import { FetchResultContainer } from "../components/Dashboard";
import LoadingIcon from "../components/LoadingIcon";

import useFetch from "../hooks/useFetch";

const Bulb = () => {
  const { data, isError } = useFetch("/stats");

  if (isError) {
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
    <DashboardTile gColumn={"1 / -1"}>
      <ItemComponent title={"Currently under construction"} />
    </DashboardTile>
  );
};

export default Bulb;
