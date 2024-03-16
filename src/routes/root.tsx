import App from "@/App";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserContext } from "@/context/user";
import { User } from "@/utils/getUser";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./root.css";

function Root() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    setUser(JSON.parse(localStorageUser ?? ""));
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <>
        <Header />

        <Box component={"main"}>
          <App />
        </Box>

        <Footer />
      </>
    </UserContext.Provider>
  );
}

export default Root;
