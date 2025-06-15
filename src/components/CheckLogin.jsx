import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

//To check if there is an existing user token and navigate to dashboard if true

export default function RequireAuth({ children }) {
  const currentUser = useContext(AuthContext).currentUser;
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
