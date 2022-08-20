import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --text-dark: hsl(0 0% 87%);
    --text-dark-muted: hsl(0 0% 60%);
    
    --text-contrast: hsl(0 0% 95%);
    
    --bg-dark: hsl(0 0% 12%);
    --bg-dark-muted: hsl(240 1% 15%);
    --bg-light: hsl(0 0% 100%);
    --bg-light-muted: hsl(0 0% 95%);
    
    --text-light: hsl(0 0% 10%);
    --text-light-muted: hsl(0 2% 30%);
    --text-light-lightest: hsl(0 2% 50%);

    --clr-blue: hsl(210 98% 47%);
    --clr-blue-muted: hsl(210 98% 40%);
    --clr-blue-dark: hsl(215 100% 37%);
    --clr-blue-light: hsl(215 100% 70%);
    --clr-blue-light-muted: hsl(215 100% 60%);
    
    --clr-highlight-green: hsl(104 72% 50%);
    --clr-highlight-red: hsl(359 75% 50%);
    --clr-highlight-yellow: hsl(42 93% 50%);
    --clr-highlight-bg-green: 100 39% 95%;
    --clr-highlight-bg-red: 355 41% 95%;
    --clr-highlight-bg-yellow: 39 63% 95%;
    --clr-highlight-bg-green-dark: 100 39% 60%;
    --clr-highlight-bg-red-dark: 355 41% 60%;
    --clr-highlight-bg-yellow-dark: 39 63% 60%;

    --shadow-color: ${(props) => props.theme.shadowColor};
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

    --fs-200: 0.5rem;
    --fs-300: 0.75rem;
    --fs-400: 1rem;
    --fs-500: 1.25rem;
    --fs-600: 1.5rem; 
    --fs-700: 1.75rem;
    --fs-800: 2rem;
  }

  @media (min-width: 50em) {
    :root {
      --fs-200: 0.75rem;
      --fs-300: 1rem;
      --fs-400: 1.25rem;
      --fs-500: 1.5rem;
      --fs-600: 2rem;
      --fs-700: 2.5rem;
    }
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
    background: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
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
    margin: 0;
  }

  #root, #__next {
    isolation: isolate;
  }
`;

export default GlobalStyle;
