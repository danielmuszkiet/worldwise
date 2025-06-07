import { useReducer } from "react";
import { AuthContext } from "./FakeAuthContext";

import type { User } from "../types";

type AuthProviderPops = {
  children: React.ReactNode;
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

type Action = { type: "login"; payload: User } | { type: "logout" };

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER: User = {
  name: "Dummy",
  email: "dummy@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100",
};

function AuthProvider({ children }: AuthProviderPops) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function login(email: string, pw: string) {
    // Fake User hardcoded!
    // Normaly there would be an API Call here!
    // Just for practice its done like that!

    if (email === FAKE_USER.email && pw === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
