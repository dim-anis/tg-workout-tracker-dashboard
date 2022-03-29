import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  --text-dark: 	hsla(0, 0%, 100%, 0.87);
  --text-dark-muted: 	hsla(0, 0%, 100%, 0.6);
  --bg-dark: hsl(0, 0%, 12%);
  --bg-dark-muted: hsl(240, 1%, 15%);
}

html, body, #root, #root>div {
  height: 100%;
  min-height: 100vh;
  width: 100%;
}

html, body {
  font-family: 'Spline Sans', sans-serif;
  color: ${(props) => props.theme.color};
  margin: 0;
  padding: 0;
}

body {
  background-color: ${(props) => props.theme.backgroundColor};
}
`;

export default GlobalStyle;
