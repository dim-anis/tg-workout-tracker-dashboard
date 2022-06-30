import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --text-dark: hsl(0, 0%, 87%);
    --text-dark-muted: hsl(0, 0%, 60%);
    --bg-dark: hsl(0, 0%, 12%);
    --bg-dark-muted: hsl(240, 1%, 15%);
    --bg-light: hsl(0, 0%, 100%);
    --bg-light-muted: hsl(0, 0%, 95%);
    --text-light: hsl(0, 0%, 10%);
    --text-light-muted: hsl(0, 2%, 30%);
    --text-light-lightest: hsl(0, 2%, 50%);

    --shadow-color: 0deg 0% 59%;
    --shadow-elevation-low:
      0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
      0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
      1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
    --shadow-elevation-medium:
      0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
      0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
      2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
      5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
    --shadow-elevation-high:
      0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
      1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.34),
      2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.34),
      4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.34),
      7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.34),
      11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.34),
      17px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.34),
      25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.34);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root, #root>div {
    height: 100%;
    min-height: 100vh;
    width: 100%;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    margin: 0 auto;
    font-family: 'Spline Sans', sans-serif;
    background: var(--bg-light-muted);
    color: var(--text-light);
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root, #__next {
    isolation: isolate;
  }
`;

export default GlobalStyle;
