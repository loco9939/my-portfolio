import App from "@/App";
import { getUserFinancial } from "@/utils/getUser";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./root.css";
import { useLogin } from "./root.hooks";

function Root() {
  const navigate = useNavigate();
  const isLoggedIn = useLogin();
  const userFinancialData = getUserFinancial();

  const onClickLogout = () => window.localStorage.removeItem("user");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else if (!userFinancialData) {
      navigate("/register-assets");
    }
  }, [isLoggedIn, userFinancialData, navigate]);

  return (
    <>
      <Box component={"header"} className="header">
        <Link to={"/"}>My Portfolio</Link>
        {userFinancialData && (
          <Link to={"/edit-assets"} className="edit">
            Edit
          </Link>
        )}
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
