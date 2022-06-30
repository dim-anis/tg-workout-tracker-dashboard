import styled from "styled-components";

const StyledUL = styled.ul`
  padding: 0.5rem 1rem;
  list-style: none;
  //background-color: papayawhip;
  border-radius: 10px;
  text-align: center;
`;

const StyledLI = styled.li`
  padding: 1rem;
  background-color: hsl(222, 70%, 90%);
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: box-shadow 125ms ease-in-out;

  &:hover {
    box-shadow: var(--shadow-elevation-medium);
  }
`;

const WorkoutSets = ({ sets }) => {
  const exerciseNames = sets.map(set => set.exercise);
  const uniqueExerciseName = [...new Set(exerciseNames)];
  return ( 
    <StyledUL>
      {
      uniqueExerciseName.map((exercise) => (
        <StyledLI>{exercise}</StyledLI>
      ))
      }
    </StyledUL>
   );
}
 
export default WorkoutSets;