import { UserContext } from "@/context/user";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

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
    <Box component={"header"} className={styles.header}>
      <Box component={"nav"} className={styles.nav}>
        <Link to={"/"} className={styles.logo}>
          <img src="my-portfolio-icon.svg" alt="logo" />
        </Link>
        <Link to={"/"} className={styles.title}>
          My Portfolio
        </Link>

        <Box className={styles.menu}>
          {user?.monthlyAssets && (
            <Link to={"/edit-assets"} className={styles.edit}>
              Edit
            </Link>
          )}
          {user && (
            <Link
              to={"/signin"}
              onClick={onClickLogout}
              className={styles.logout}
            >
              Logout
            </Link>
          )}
        </Box>
        <Menu className={styles.hamburger} />
      </Box>
    </Box>
  );
};

export default Header;
