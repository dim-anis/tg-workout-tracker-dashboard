import React from "react";
import styled from "styled-components";

import { ReactComponent as IconChevronUp } from "../images/icons/chevron-up.svg";
import { ReactComponent as IconChevronDown } from "../images/icons/chevron-down.svg";

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Diff = styled.div`
  background-color: ${ (props) => 
    props.changePercentage > 0 
      ? "hsl(100, 85%, 95%)" 
      : props.changePercentage < 0 
      ? "hsl(355, 85%, 95%)"
      : ""
  };
  color: ${ (props) => 
    props.changePercentage > 0 
    ? "hsl(100, 60%, 40%)"
    : props.changePercentage < 0 
    ? "hsl(359, 94%, 55%)"
    : ""
  };
  padding: 0.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiffContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const DataContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Data = styled.p`
  font-size: 2.5rem;
  margin: 0;
  font-weight: 600;

  @media (max-width: 560px) {
    font-size: 1.5rem;
  }
`;

const DataTitle = styled.p`
  font-size: 1rem;
  color: var(--text-light-muted);
  margin: 0;
  font-weight: 200;

  @media (max-width: 560px) {
    font-size: 0.75rem;
  }
`;

const Icon = styled.div`
  max-width: 2.5rem;
  color: hsl(222, 69%, 70%);
  fill: hsl(222, 69%, 70%);
  margin-bottom: 1rem;
  background-color: hsl(222, 69%, 95%);
  padding: 5px;
  border-radius: 5px;
  align-self: center;
`;

export default function ItemComponent({ data, title, changePercentage, icon }) {
  return (
    <Wrapper>
      {icon && <Icon>{icon}</Icon>}
      <DataContainer>   
        <TextDataContainer>
          <Data>{data}</Data>
          <DataTitle>{title}</DataTitle>
        </TextDataContainer>

        {changePercentage &&
        <DiffContainer>
          <Diff changePercentage={changePercentage}>
            {changePercentage > 0 
              ? <IconChevronUp width="16px" /> 
              : changePercentage < 0
              ? <IconChevronDown width="16px" />
              : null
              }
            {Math.abs(changePercentage) + " %"}
          </Diff>
        </DiffContainer>
        }
      </DataContainer>
    </Wrapper>
  );
}
