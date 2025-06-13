import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const currentUser = useContext(AuthContext).currentUser;
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
