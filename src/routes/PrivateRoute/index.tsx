import { Navigate } from "react-router-dom";
import { useLogin } from "../root.hooks";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useLogin();

  if (!isLoggedIn) return <Navigate to="/signin" />;

  return <>{children}</>;
};

export default PrivateRoute;
