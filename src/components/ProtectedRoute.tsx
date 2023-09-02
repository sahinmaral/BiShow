import { FC,  ReactNode } from "react";
import { Navigate } from "react-router-dom";
import User from "../types/User";

type ProtectedRouteProps = {
  children: ReactNode;
  isLoading: boolean;
  user: User | null;
  redirectPath?: string;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  user,
  isLoading,
  children,
  redirectPath = "/giris-yap",
}) => {
  if (!user && !isLoading) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
