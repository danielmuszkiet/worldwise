// Only exports the context (NOT a React component)
import { createContext } from "react";
import type { Action, TCity } from "../types";
export type CitiesContextType = {
  cities: TCity[];
  currentCity: TCity | undefined;
  isLoading: boolean;
  dispatch: React.Dispatch<Action>;
};

export const CitiesContext = createContext<CitiesContextType | null>(null);
