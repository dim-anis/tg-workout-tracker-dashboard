import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledRouterLink = styled(Link)`
  border: 1px solid ${(props) => props.theme.colorMain};
  border-radius: 10px;
  text-decoration: none;
  padding: 1rem;
  text-align: center;

  &:hover {
    background: ${(props) => props.theme.colorMain};
    color: ${(props) => props.theme.bgColorSecondary} !important;
  }

  &:visited {
    color: ${(props) => props.theme.colorMain};
  }
`;

const PageNotFound = () => {
  return (
    <Container>
      <Message>
        <MessageContainer>
          <h1>Error 404</h1>
          <p>The page you are trying to access does not exist.</p>
        </MessageContainer>
        <StyledRouterLink to="/">Back to Main</StyledRouterLink>
      </Message>
    </Container>
  );
};

export default PageNotFound;
