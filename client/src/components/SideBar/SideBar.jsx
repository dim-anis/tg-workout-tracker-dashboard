import React from "react";
import styled from "styled-components";

import SideNav from "./SideNav";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-width: 10%;
  background-color: var(--bg-light);
  border-radius: 10px;
  box-shadow: var(--shadow-elevation-medium);

  @media(max-width: 560px) {
    display: none;
  }
`;

const SideBar = () => {
  return (
    <Container>
      <SideNav />
    </Container>
  )
}

export default SideBar;