import styled from "styled-components";

const Tile = styled.div`
  background: var(--bg-light);
  padding: ${props => props.padding};
  border-radius: 10px;
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: space-around;
  gap: 0.5rem;
  align-items: center;
  grid-column: ${(props) => props.span || ""};
  cursor: pointer;
  box-shadow: var(--shadow-elevation-medium);

  @media(max-width: 560px) {
    border-radius: 0;
    border: 1px solid var(--bg-light-muted);
    align-items: center;
  }
`;

const DashboardTile = ({ span, children, direction, padding }) => {
  return (
    <Tile 
      span={span} 
      direction={direction} 
      padding={padding}>
      {children}
    </Tile>
  );
}
 
export default DashboardTile;