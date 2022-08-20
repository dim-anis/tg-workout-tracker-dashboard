import React from "react";
import styled from "styled-components";

import SideNav from "./SideNav";

const Container = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColorSecondary};
  box-shadow: var(--shadow-elevation-medium);
  border-radius: 10px;

  @media (max-width: 50em) {
    height: auto;
    z-index: 20;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
  }
`;

const SideBar = () => {
  return (
    <Container>
      <SideNav />
    </Container>
  );
};

export default SideBar;
