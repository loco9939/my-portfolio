import { StyledEngineProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/_reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* NOTE: CSS-in-JS 방식에서 custom-style이 덮어씌워지는 문제 해결 */}
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
