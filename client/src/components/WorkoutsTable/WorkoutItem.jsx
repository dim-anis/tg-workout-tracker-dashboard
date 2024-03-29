import styled from "styled-components";
import { ReactComponent as IconUser } from "../../images/icons/person.svg";
import { ReactComponent as IconMore } from "../../images/icons/more.svg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${(props) => props.theme.textColor};
  fill: ${(props) => props.theme.textColorSecondary};
`;

const RightContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.textColor};
  fill: ${(props) => props.theme.textColorSecondary};
  align-items: center;
  gap: 1rem;
`;

const Title = styled.p`
  margin: 0;
  font-size: var(--fs-400);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: var(--fs-200);
  color: ${(props) => props.theme.textColorSecondary};
`;

const WorkoutItem = ({ name, rpe, weight, handleClick, _id }) => {
  return (
    <Container>
      <LeftContainer>
        <IconUser style={{ width: "2rem" }} />
        <div>
          <Title>{name}</Title>
          <Subtitle>{rpe}</Subtitle>
        </div>
      </LeftContainer>
      <RightContainer>
        <Title>{`${new Intl.NumberFormat().format(weight)} KG`}</Title>
        <Button onClick={handleClick} id={_id}>
          <IconMore
            style={{
              width: "1.5rem",
              transform: "rotate(90deg)",
            }}
          />
        </Button>
      </RightContainer>
    </Container>
  );
};

export default WorkoutItem;
