import React from "react";
import styled from "styled-components";
import { ReactComponent as Sun } from "../images/sun.svg";

const Container = styled.div`
  display: flex;
  padding: 10px 0px;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderLogoH1 = styled.h1`
  font-size: 2rem;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const HeaderLogoH2 = styled.h2`
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0;
  color: ${(props) => props.theme.item.color};
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 25px;
  color: ${(props) => props.theme.item.color};
  cursor: pointer;
  transition: ease-in-out 200ms;
  &:hover {
    color: ${(props) => props.theme.color};
  }
`;

export default function HeaderComponent({ onClick }) {
  return (
    <Container>
      <TitleContainer>
        <HeaderLogoH1>Dashboard</HeaderLogoH1>
        <HeaderLogoH2>My stats</HeaderLogoH2>
      </TitleContainer>
      <Button onClick={onClick}>
        <Sun />
      </Button>
    </Container>
  );
}
