import { useContext } from "react";
import { AuthContext } from "./FakeAuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a CitiesProvider");
  }
  return context;
}
