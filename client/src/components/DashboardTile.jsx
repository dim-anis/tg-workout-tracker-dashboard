import styled from "styled-components";

const Tile = styled.section`
  background: ${(props) => props.theme.bgColorSecondary};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  padding: 1rem 0.75rem;
  box-shadow: var(--shadow-elevation-medium);
  grid-column: ${(props) => props.gColumn};
  border: 1px solid ${(props) => props.theme.bgColor};
  border-radius: 0.5rem;

  @media (min-width: 50em) {
    padding: 2rem;
  }
`;

const DashboardTile = ({
  flexDirection,
  gColumn,
  alignItems,
  justifyContent,
  children,
}) => {
  return (
    <Tile
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      gColumn={gColumn}
    >
      {children}
    </Tile>
  );
};

export default DashboardTile;
