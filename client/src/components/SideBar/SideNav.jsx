import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';
import { ReactComponent as IconCube } from "../../images/icons/cube.svg";
import { ReactComponent as IconFlame } from "../../images/icons/flame.svg";
import { ReactComponent as IconLocation } from "../../images/icons/location.svg";
import { ReactComponent as IconAddCircle } from "../../images/icons/add-circle.svg";
import { ReactComponent as IconBarChart } from "../../images/icons/bar-chart.svg";
import { ReactComponent as IconBarbell } from "../../images/icons/barbell.svg";
import { ReactComponent as IconBulb } from "../../images/icons/bulb.svg";

const Nav = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-top: calc(2rem + 10px);
`;

const SideNav = () => {
  return ( 
    <Nav>
      <NavItem 
        icon={ <IconBarChart /> } 
        to="/" />
      <NavItem 
        icon={ <IconCube />} 
        to="cube" />
      <NavItem 
        icon={ <IconFlame /> } 
        to="fire" />
      <NavItem 
        icon={ <IconLocation /> }
        to="someRoute" />
      <NavItem 
        icon={ <IconAddCircle /> }
        to="someRoute" />
      <NavItem 
        icon={ <IconBarbell /> }
        to="someRoute" />
      <NavItem 
        icon={ <IconBulb /> }
        to="someRoute" />
    </Nav>
   );
}
 
export default SideNav;