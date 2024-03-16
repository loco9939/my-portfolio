import { UserContext } from "@/context/user";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const onClickLogout = () => {
    if (!confirm("로그아웃 하시겠습니까?")) {
      // 취소 클릭시,
    } else {
      // 확인 클릭시,
      setUser(null);
      window.localStorage.removeItem("user");
    }
  };

  return (
    <Box component={"header"} className="header">
      <Link to={"/"}>My Portfolio</Link>
      {user?.monthlyAssets && (
        <Link to={"/edit-assets"} className="edit">
          Edit
        </Link>
      )}
      {user && (
        <Link to={"/signin"} onClick={onClickLogout} className="logout">
          Logout
        </Link>
      )}
    </Box>
  );
};

export default Header;
