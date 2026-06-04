import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../hooks";

const ProtectedRoute = () => {
  const { isLoggedIn } = useUserAuth();

  // If not logged in, redirect to home or sign-in
  if (!isLoggedIn) {
     // You might want to store the location they were trying to access to redirect back after login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
