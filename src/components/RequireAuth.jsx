import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Check for user token. If false navigate to login page

export default function RequireAuth({ children }) {
  const currentUser = useContext(AuthContext).currentUser;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
