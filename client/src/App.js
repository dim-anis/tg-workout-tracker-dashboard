import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import ItemComponent from "./components/itemComponent";
import HeaderComponent from "./components/headerComponent";
import { themes } from "./themes";
import GlobalStyle from "./globalStyles";
import { getTodaysWorkout, volumeMonth, getWorkoutsVolume } from "./utils";
import Chart from "./components/chart";

export const AppContext = React.createContext();

const Container = styled.div`
  height: 100vh;
  width: 90vw;
  max-width: 960px;
  padding: 20px 20px;
  margin: auto;
`;

const DashBoard = styled.div`
  display: grid;
  height: 90%;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

function App() {
  const [workouts, setWorkouts] = useState();
  const [user, setUser] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const [req1, req2] = await Promise.all([
          fetch("http://localhost:5000/stats/workouts"),
          fetch("http://localhost:5000/stats/last-workout"),
        ]);
        const workoutsData = await req1.json();
        const userData = await req2.json();
        setWorkouts(workoutsData);
        setUser(userData[0]);
      } catch (err) {
        setIsError(true);
        console.log("A wild error occured: ", err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const workout_sequence = ["Upper_A", "Lower_A", "Upper_B", "Lower_B"];
  const nextWorkout = getTodaysWorkout(user.last_workout, workout_sequence);

  const dailyVolumes = getWorkoutsVolume(workouts);
  const totalVolume = volumeMonth(workouts);
  const totalWorkouts = dailyVolumes ? dailyVolumes.length : 0;

  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const oppositeTheme = () => {
    return currentTheme === themes.light ? themes.dark : themes.light;
  };
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Container>
        <HeaderComponent onClick={() => setCurrentTheme(oppositeTheme())} />
        <DashBoard>
          <AppContext.Provider value={[isError, isLoading]}>
            <ItemComponent
              chart={<Chart data={dailyVolumes} />}
              title={"VOLUME PER WORKOUT"}
              fullWidth
            />
            <ItemComponent data={totalVolume} title={"TOTAL VOLUME"} />
            <ItemComponent data={nextWorkout} title={"NEXT WORKOUT"} />
            <ItemComponent
              data={totalWorkouts}
              title={"TOTAL WORKOUTS"}
              fullWidth
            />
          </AppContext.Provider>
        </DashBoard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
