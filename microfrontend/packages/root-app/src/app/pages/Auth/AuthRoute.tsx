import { useAuthStore } from "@store/useAuth.store";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute: FC = ({ children }) => {
  const location = useLocation();
  const { token } = useAuthStore();
  if (token) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
