import { ReactNode } from "react";
import { getCurrentUser } from "@/service/auth_service";
import { Navigate } from "react-router-dom";

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
