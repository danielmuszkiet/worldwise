import { Navigate } from "react-router";
import { useAuth } from "../contexts/useAuth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
