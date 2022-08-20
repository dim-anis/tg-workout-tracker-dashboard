import styled from "styled-components";

import { ReactComponent as IconChevronUp } from "../images/icons/chevron-up.svg";
import { ReactComponent as IconChevronDown } from "../images/icons/chevron-down.svg";

const ChevronContainer = styled.div`
  background-color: ${(props) =>
    props.diff > 0
      ? props.theme.colorHighlightBgGreen
      : props.diff < 0
      ? props.theme.colorHighlightBgRed
      : ""};
  color: ${(props) =>
    props.diff > 0
      ? props.theme.colorHighlightGreen
      : props.diff < 0
      ? props.theme.colorHighlightRed
      : ""};
  padding: 0.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 50em) {
    font-size: var(--fs-300);
    padding: 0.25rem;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Chevron = ({ diff }) => {
  return (
    <Container>
      <ChevronContainer diff={diff}>
        {diff > 0 ? (
          <IconChevronUp width="16px" />
        ) : diff < 0 ? (
          <IconChevronDown width="16px" />
        ) : null}
        {`${diff} %`}
      </ChevronContainer>
    </Container>
  );
};

export default Chevron;
