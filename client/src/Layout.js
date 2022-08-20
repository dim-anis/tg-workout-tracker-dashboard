import * as React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideBar from "./components/SideBar/SideBar";

const GlobalContainer = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  min-width: 100%;
  height: 100%;

  @media (min-width: 50em) {
    flex-direction: row-reverse;
    justify-content: stretch;
    padding-inline: 1rem;
    gap: 0.75rem;
    height: 90%;
  }
`;

const DashBoard = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fit, minmax(30%, 1fr));
  gap: 1rem;

  @media (max-width: 50em) {
    gap: 1rem;
    width: 95%;
    margin: 1rem auto;
    grid-template-columns: 1fr;
    grid-template-rows: 30%;
    grid-auto-rows: auto;
    padding-bottom: 7rem;
  }
`;

function Layout() {
  return (
    <GlobalContainer>
      <AppContainer>
        <DashBoard>
          <Outlet />
        </DashBoard>
        <SideBar />
      </AppContainer>
    </GlobalContainer>
  );
}

export default Layout;
