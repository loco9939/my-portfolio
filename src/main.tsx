import { StyledEngineProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./page/dashboard/index.tsx";
import EditAssets from "./page/editAssets/index.tsx";
import ErrorPage from "./page/errorPage/index.tsx";
import Login from "./page/login/index.tsx";
import RegisterAssets from "./page/registerAssets/index.tsx";
import SignUp from "./page/signup/index.tsx";
import Root from "./routes/root.tsx";
import "./styles/_reset.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/register-assets", element: <RegisterAssets /> },
      { path: "/edit-assets", element: <EditAssets /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* NOTE: CSS-in-JS 방식에서 custom-style이 덮어씌워지는 문제 해결 */}
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);
