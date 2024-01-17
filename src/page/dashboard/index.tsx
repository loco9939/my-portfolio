import { User } from "@/index";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const userString = window.localStorage.getItem("user");
  const user = userString ? (JSON.parse(userString) as User) : null;

  // TODO: AuthRouter 생성하여 라우터로 로그인 안했을 경우 /signin 이동
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  });
  return <div>Dashboard</div>;
}

export default Dashboard;
