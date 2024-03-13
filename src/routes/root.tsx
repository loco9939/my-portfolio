import App from "@/App";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import "./root.css";

function Root() {
  return (
    <>
      <Header />

      <Box component={"main"}>
        <App />
      </Box>

      <Footer />
    </>
  );
}

export default Root;
