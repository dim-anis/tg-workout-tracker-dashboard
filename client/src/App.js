import * as React from "react";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";
import { Outlet } from "react-router-dom";

import SideBar from "./components/SideBar/SideBar";

const Container = styled.div`
  height: 100vh;
  gap: 20px;
  margin: auto;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashBoard = styled.div`
  display: grid;
  height: 90%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(1, auto) 2fr 1fr 1fr;
  gap: 1rem;
  //align-self: center;
  padding-right: 1rem;

  @media(max-width: 560px) {
    gap: 0;
    height: 100%;
    padding: 0;
  }
`;

function App() {
  return (
    <>
    <GlobalStyle/>
    <Container>
      <SideBar/>
      <DashBoard>
        <Outlet />
      </DashBoard>
    </Container>
    </>
  );
}

export default App;
