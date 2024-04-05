import { Box } from "@mui/material";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <Box component={"footer"} className={styles.footer}>
      <p>My Portfolio - Copyright for loco9939 @2024 </p>
      <p>Email: kls9939@naver.com</p>
      <p>github: https://github.com/loco9939</p>
    </Box>
  );
};

export default Footer;
