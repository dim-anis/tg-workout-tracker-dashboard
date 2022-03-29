import React, { useContext } from "react";
import { AppContext } from "../App";
import styled from "styled-components";

const Item = styled.div`
  background-color: ${(props) =>
    props.theme.item.backgroundColor}; //var(--bg-dark)
  border-radius: 15px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  grid-column: ${(props) => (props.fullWidth ? "1 / span 2" : "")};
  cursor: pointer;
`;

const Data = styled.p`
  font-size: 2.5rem;
  color: ${(props) => props.theme.color};
  text-align: center;
  margin: 0;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const DataTitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.item.color};
  text-align: center;
  margin: 0;
  font-weight: 200;
  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

export default function ItemComponent({ fullWidth, data, title, chart }) {
  const [isError, isLoading] = useContext(AppContext);
  return (
    <>
      {isError && (
        <Item>
          <DataTitle>Something went wrong...</DataTitle>
        </Item>
      )}

      {isLoading ? (
        <Item fullWidth={fullWidth}>
          <DataTitle>{"Loading..."}</DataTitle>
        </Item>
      ) : (
        <Item fullWidth={fullWidth}>
          {chart}
          <Data>{data}</Data>
          <DataTitle>{title}</DataTitle>
        </Item>
      )}
    </>
  );
}
