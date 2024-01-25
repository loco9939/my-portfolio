import { Box } from "@mui/material";
import "./root.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import App from "@/App";
import { useLogin } from "./root.hooks";
import { useEffect } from "react";

function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useLogin();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <>
      <Box component={"header"} className="header">
        <Link to={"/"}>My Portfolio</Link>
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
