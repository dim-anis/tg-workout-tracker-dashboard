import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";

import { ThemeProviderReact } from "./contexts/ThemeProvider";

const ThemeWrapper = ({ children }) => {
  return <ThemeProviderReact>{children}</ThemeProviderReact>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeWrapper>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeWrapper>
);
