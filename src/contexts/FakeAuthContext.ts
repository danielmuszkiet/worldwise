// Only exports the context (NOT a React component)
import { createContext } from "react";
import type { User } from "../types";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pw: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
