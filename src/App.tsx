import { Box } from "@mui/material";
import "./App.css";
import Router from "./router";

function App() {
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/signin");
  //   }
  // }, [user, navigate]);

  return (
    <>
      <Box component={"header"} className="header">
        My Portfolio
      </Box>
      <Box component={"main"}>
        <Router />
      </Box>
      <Box component={"footer"} className="footer">
        My Portfolio footer
      </Box>
    </>
  );
}

export default App;
