import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { ThemeContext } from "./contexts/ThemeProvider";
import Fire from "./routes/fire";
import Cube from "./routes/cube";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import Bulb from "./routes/bulb";

import ProtectedRoute from "./components/ProtectedRoute";
import PersistSignIn from "./components/PersistantSignIn";
import Register from "./pages/register";
import SignIn from "./pages/signin";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import { lightTheme, darkTheme } from "./themes";
import PageNotFound from "./pages/404";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route element={<PersistSignIn />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="cube" element={<Cube />} />
              <Route path="fire" element={<Fire />} />
              <Route path="bulb" element={<Bulb />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
