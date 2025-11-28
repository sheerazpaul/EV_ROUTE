import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const access = localStorage.getItem("access");

  return user && access ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;