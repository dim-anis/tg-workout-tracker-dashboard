import styled from "styled-components";
import { ReactComponent as IconElipsis } from "../images/icons/ellipsis.svg";

const StyledIcon = styled(IconElipsis)`
  width: 3rem;
  opacity: 1;
  color: var(--text-dark-muted);
  animation: change_opacity 1s infinite;

  @keyframes change_opacity {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

`;

const LoadingIcon = () => {
  return <StyledIcon />;
}
 
export default LoadingIcon;