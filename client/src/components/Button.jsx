import styled from "styled-components";

const ButtonStyled = styled.button`
  border: none;
  color: ${(props) =>
    props.main ? props.theme.textContrast : props.theme.colorMain};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.main ? props.theme.colorMain : "transparent"};
  margin: 0.75rem 0rem;
  width: ${(props) => props.width || "auto"};

  &:hover {
    background-color: ${(props) => props.theme.colorMainMuted};
  }
`;

const Button = ({ children, main, width, onClick }) => {
  return (
    <ButtonStyled main={main} onClick={onClick} width={width}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
