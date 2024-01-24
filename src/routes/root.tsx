import { Box } from "@mui/material";
import "./root.css";
import { useNavigate } from "react-router-dom";
import App from "@/App";
import { useLogin } from "./root.hooks";
import { useEffect } from "react";

function Root() {
  const navigate = useNavigate();
  const isLoggedIn = useLogin();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  });

  return (
    <>
      <Box
        component={"header"}
        className="header"
        onClick={() => navigate("/")}
      >
        My Portfolio
      </Box>
      <Box component={"main"}>
        <App />
      </Box>
      <Box component={"footer"} className="footer">
        My Portfolio footer
      </Box>
    </>
  );
}

export default Root;
