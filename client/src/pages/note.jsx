import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const StyledRouterLink = styled(Link)`
  color: ${(props) => props.theme.colorMain};

  &:visited {
    color: ${(props) => props.theme.colorMain};
  }
`;

const P = styled.p`
  margin: 0;
`;

const Note = ({ children, to, linkText }) => {
  return (
    <Wrapper>
      <P>{children}</P>
      <StyledRouterLink to={to}>{linkText}</StyledRouterLink>
    </Wrapper>
  );
};

export default Note;
