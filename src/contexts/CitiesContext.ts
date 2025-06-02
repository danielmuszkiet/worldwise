// Only exports the context (NOT a React component)
import { createContext } from "react";
import type { TCity } from "../types";

export type CitiesContextType = {
  cities: TCity[];
  isLoading: boolean;
  setCities: React.Dispatch<React.SetStateAction<TCity[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CitiesContext = createContext<CitiesContextType | null>(null);
