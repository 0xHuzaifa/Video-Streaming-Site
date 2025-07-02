import { useAppContext } from "@/hooks/UseAppContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import type { FC } from "react";

const ProtectedRoute: FC = () => {
  const { isLogin } = useAppContext();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const GuestOnlyRoute: FC = () => {
  const { isLogin } = useAppContext();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute, GuestOnlyRoute };
