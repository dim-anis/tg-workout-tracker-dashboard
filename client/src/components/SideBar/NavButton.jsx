import styled from "styled-components";

const ItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 1 1 auto;

  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const Button = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
`;

const Icon = styled.div`
  width: 2rem;
  margin: 1rem;
  fill: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
`;

const NavButton = ({ icon, onClick }) => {
  return (
    <ItemContainer href={null}>
      <Button onClick={onClick}>
        <Icon>{icon}</Icon>
      </Button>
    </ItemContainer>
  );
};

export default NavButton;
