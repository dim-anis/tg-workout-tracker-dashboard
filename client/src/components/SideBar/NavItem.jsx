import { useContext } from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeProvider";

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

const Icon = styled.div`
  width: 2rem;
  margin: 1rem;
  fill: ${(props) => props.theme.textColor};
`;

const NavItem = ({ icon, to }) => {
  const { theme } = useContext(ThemeContext);

  const styles = {
    activeStyle: {
      color: theme === "light" ? "hsl(210, 98%, 47%)" : "hsl(215, 100%, 70%)",
    },
    basicStyle: {
      color: theme === "light" ? "hsl(0 0% 20%)" : "hsl(0 0% 87%)",
    },
  };

  return (
    <ItemContainer>
      <NavLink
        to={to}
        style={({ isActive }) =>
          isActive ? styles.activeStyle : styles.basicStyle
        }
      >
        <Icon>{icon}</Icon>
      </NavLink>
    </ItemContainer>
  );
};

export default NavItem;
