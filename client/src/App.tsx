import { BrowserRouter as Router } from "react-router-dom";
import GlobalStateProvider from "./context/global/useGlobalState";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <AppRoutes />
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
