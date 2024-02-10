import App from "@/App";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./root.css";
import { useLogin } from "./root.hooks";

function Root() {
  const isLoggedIn = useLogin();
  const onClickLogout = () => window.localStorage.removeItem("user");

  return (
    <>
      <Box component={"header"} className="header">
        <Link to={"/"}>My Portfolio</Link>
        {isLoggedIn && (
          <Link to={"/signin"} onClick={onClickLogout} className="logout">
            Logout
          </Link>
        )}
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
