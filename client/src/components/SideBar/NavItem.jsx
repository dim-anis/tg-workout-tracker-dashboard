import * as React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

const ItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-light-muted);
    color: red;
  }
`;

const Icon = styled.div`
  width: 2rem;
  margin: 1rem;
`;

let activeStyle = { color: "hsl(225, 69%, 50%)" };
let basicStyle = { color: "hsl(222, 70%, 70%)" };

const NavItem = ({ icon, to }) => {
  return ( 
    <ItemContainer>
      <NavLink to={to} style={({ isActive }) => isActive ? activeStyle : basicStyle} >
        <Icon>{icon}</Icon>
      </NavLink>
    </ItemContainer>
   );
}
 
export default NavItem;