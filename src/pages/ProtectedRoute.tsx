import { Navigate } from "react-router";
import { useAuth } from "../contexts/useAuth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
