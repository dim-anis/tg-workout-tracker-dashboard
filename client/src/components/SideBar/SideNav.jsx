import React from "react";
import styled from "styled-components";

import NavItem from "./NavItem";
import NavButton from "./NavButton";
import { ReactComponent as IconCube } from "../../images/icons/cube.svg";
import { ReactComponent as IconFlame } from "../../images/icons/flame.svg";
import { ReactComponent as IconBarChart } from "../../images/icons/bar-chart.svg";
import { ReactComponent as IconSettings } from "../../images/icons/settings.svg";
import { ReactComponent as IconBulb } from "../../images/icons/bulb.svg";
import { ReactComponent as IconSun } from "../../images/icons/sun.svg";
import { ReactComponent as IconMore } from "../../images/icons/more.svg";
import { ReactComponent as IconAdd } from "../../images/icons/add.svg";

import { ThemeContext } from "../../contexts/ThemeProvider";
import useAuth from "../../hooks/useAuth";

const Nav = styled.ul`
  padding: 0;
  margin: 2rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  @media (max-width: 50em) {
    margin: 0rem;
    flex-direction: row;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SideNav = () => {
  const { signout } = useAuth();
  const { toggleTheme } = React.useContext(ThemeContext);

  return (
    <Container>
      <Nav>
        <NavItem icon={<IconBarChart />} to="/" />
        <NavItem icon={<IconCube />} to="cube" />
        <NavButton icon={<IconAdd />} onClick={null} />
        {/* <NavItem icon={<IconFlame />} to="fire" /> */}
        <NavItem icon={<IconBulb />} to="bulb" />
        {/* <NavButton icon={<IconSun />} onClick={toggleTheme} /> */}
        <NavButton icon={<IconSettings />} onClick={signout} />
        {/* <NavButton icon={<IconMore />} /> */}
      </Nav>
    </Container>
  );
};

export default SideNav;
