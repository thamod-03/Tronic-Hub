
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const  PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return user ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;