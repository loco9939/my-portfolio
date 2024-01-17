import Dashboard from "@/page/dashboard";
import Login from "@/page/login";
import SignUp from "@/page/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "@/page/errorPage";

function Router() {
  // TODO: ErrorPage 연동하기
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
