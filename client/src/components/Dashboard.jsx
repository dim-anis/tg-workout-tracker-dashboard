import React from "react";
import { format, parseISO, subMonths, startOfDay } from "date-fns";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

import ItemComponent from "./itemComponent";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DashboardTile from "./DashboardTile";

import { getVolume, getWorkoutVolume } from "../utils";

import { ReactComponent as IconFlame } from "../images/icons/flame.svg";
import { ReactComponent as IconBulb } from "../images/icons/bulb.svg";
import { ReactComponent as IconLocation } from "../images/icons/location.svg";
import { ReactComponent as IconCalendar } from "../images/icons/calendar.svg";
import { ReactComponent as IconCheckbox } from "../images/icons/checkbox.svg";
import LoadingIcon from "./LoadingIcon";

const pieData = [
  {id: "workouts done", label: "workoutsDone", value: 12}, 
  {id: "workouts left", label: "workoutsLeft", value: 4}
];

const Welcome = styled.div`
  grid-column: 1 / span 3;
  color: var(--text-light-muted);
`;

const H2 = styled.h2`
  margin: 0;
  @media (max-width: 560px) {
    display: none;
  }
`;

const ErrorMessage = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: row1-start;
  grid-row-end: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  const url = "https://tg-workout-tracker-dashboard.herokuapp.com/stats";
  //http://192.168.31.38:5000/stats
  // https://tg-workout-tracker-dashboard.herokuapp.com/stats
  const { data: workouts, isLoading, isError } = useFetch(url);

  let monthFromNowDate = subMonths(new Date(), 1);
  

  if (isError) { return <ErrorMessage>{isError.message}</ErrorMessage>};
  if (typeof workouts === "undefined") { return <ErrorMessage><LoadingIcon /></ErrorMessage> };

  const lastWorkoutDate = format(parseISO(Object.values(workouts).at(-1).createdAt), 'LLL d');

  const lastMonthWorkouts = Object.values(workouts).filter((set) => Date.parse(set.createdAt) > startOfDay(monthFromNowDate));
  const totalVolumeThisMonth = getVolume(lastMonthWorkouts);
  const totalVolumeThisMonthString = Math.round(totalVolumeThisMonth).toLocaleString();
  const dailyVolumesThisMonth = getWorkoutVolume(lastMonthWorkouts);
  console.log(dailyVolumesThisMonth)
  // selecting last 4 workouts, "x" stands for date, "y" stands for volume (nivo requires {x: value, y: value} data format)
  const volumeThisWeek = dailyVolumesThisMonth.slice(-5, -1).reduce((totalVolume, day) => totalVolume + day.y, 0);
  // selecting 4 workouts second to last 4 workouts
  const volumeLastWeek = dailyVolumesThisMonth.slice(-9, -5).reduce((totalVolume, day) => totalVolume + day.y, 0);

  return (
    <>
    <Welcome>
      <H2>Good afternoon, Dmitry!</H2>
    </Welcome>
    <DashboardTile 
      span={"1 / span 3"} 
      //direction={"column"}
      >
      <LineChart
        margin={{ top: 10, right: 20, bottom: 50, left: 45 }}
        data={dailyVolumesThisMonth}
        title={`Total volume:`}
        titleValue={totalVolumeThisMonthString}
        yValueUnit={'kg'}
        xValueType={"Date"}
        yValueType={"Volume"}
        />  
    </DashboardTile>
    <DashboardTile >
      <ItemComponent
        icon={ <IconLocation /> } 
        data={`${Math.round(volumeThisWeek).toLocaleString()} kgs`} 
        title={"VOLUME THIS WEEK"} 
        changePercentage={Number.parseFloat(((volumeThisWeek - volumeLastWeek) / volumeThisWeek) * 100).toFixed(1)}
      />
    </DashboardTile>
    <DashboardTile>
      <ItemComponent
        icon={ <IconBulb /> } 
        data={`${Math.round(totalVolumeThisMonth).toLocaleString()} kgs`} 
        title={"VOLUME THIS MONTH"}
      />
    </DashboardTile>
    <DashboardTile>
      <ItemComponent
        data={dailyVolumesThisMonth.length}
        title={"WORKOUTS THIS MONTH"}
        icon={ <IconCheckbox /> }
      />
    </DashboardTile>
    <DashboardTile>
      <ItemComponent 
        icon={ <IconCalendar /> }
        data={lastWorkoutDate} 
        title={"LAST WORKOUT"} 
      />
    </DashboardTile>
    <DashboardTile>
      <ItemComponent 
        data={"undefined"} 
        title={"NEXT WORKOUT"} 
        icon={ <IconFlame /> }
      />
    </DashboardTile>
    <DashboardTile>
      <PieChart 
        data={pieData}
        total={dailyVolumesThisMonth.length}
        title={"WORKOUTS THIS MONTH"}
      />
    </DashboardTile>
    </>
   );
}
 
export default Dashboard;