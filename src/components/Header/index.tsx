import { useLogin } from "@/routes/root.hooks";
import { getUserFinancial } from "@/utils/getUser";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const userFinancialData = getUserFinancial();
  const isLoggedIn = useLogin();

  const onClickLogout = () => {
    if (!confirm("로그아웃 하시겠습니까?")) {
      // 취소 클릭시,
    } else {
      // 확인 클릭시,
      window.localStorage.removeItem("user");
    }
  };

  return (
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
  );
};

export default Header;
