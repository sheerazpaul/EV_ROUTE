import { Navigate } from "react-router-dom";
import { useAuth } from "./Components/AuthContext";

export default function PublicRoute({ children }) {
  const { token } = useAuth(); 

  if (token) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
}
