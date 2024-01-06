import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Box component={"header"} className="header">
        My Portfolio
      </Box>
      <Box component={"main"}>
        <Outlet />
      </Box>
      <Box component={"footer"} className="footer">
        My Portfolio footer
      </Box>
    </>
  );
}

export default App;
