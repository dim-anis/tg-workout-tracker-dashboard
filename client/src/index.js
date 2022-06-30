import ReactDOM from "react-dom/client";
import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Fire from "./routes/fire";
import Cube from "./routes/cube";
import App from "./App";
import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<Dashboard />} />
        <Route path="cube" element={<Cube />} />
        <Route path="fire" element={<Fire />} />
      </Route>
    </Routes>
  </BrowserRouter>
);