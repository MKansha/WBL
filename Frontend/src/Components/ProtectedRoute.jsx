import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Cookies from "js-cookie"; // ✅ Check authentication from cookies

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const token = Cookies.get("auth_token"); // ✅ Check for auth token

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ✅ Render the protected component
};

export default ProtectedRoute;
