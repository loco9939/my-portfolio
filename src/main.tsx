import { StyledEngineProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./page/errorPage/index.tsx";
import Login from "./page/login/index.tsx";
import SignUp from "./page/signup/index.tsx";
import "./styles/_reset.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
    ],
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
