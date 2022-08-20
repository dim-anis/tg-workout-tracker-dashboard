import React from "react";
import styled from "styled-components";

import Chevron from "./Chevron";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 50em) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const NumberContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DataContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

const Data = styled.p`
  font-size: var(--fs-600);
  margin: 0;
  font-weight: 600;
`;

const DataTitle = styled.p`
  font-size: var(--fs-300);
  color: ${(props) => props.theme.textColorSecondary};
  margin: 0;
  font-weight: 200;
`;

const Icon = styled.div`
  width: 2rem;
  color: ${(props) => props.theme.colorMain};
  fill: ${(props) => props.theme.colorMain};
  margin-bottom: 1rem;
  align-self: left;
`;

export default function ItemComponent({ data, title, diff, icon }) {
  return (
    <Wrapper>
      {icon && <Icon>{icon}</Icon>}

      <DataContainer>
        <TextDataContainer>
          <NumberContainer>
            <Data>{data}</Data>
            {(diff > 0 || diff < 0) && <Chevron diff={diff} />}
          </NumberContainer>

          <DataTitle>{title}</DataTitle>
        </TextDataContainer>
      </DataContainer>
    </Wrapper>
  );
}
