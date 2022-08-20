import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
`;

const WorkoutsTable = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WorkoutsTable;
