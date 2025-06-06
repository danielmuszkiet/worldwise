// Only exports the context (NOT a React component)
import { createContext } from "react";
import type { TCity } from "../types";
export type CitiesContextType = {
  cities: TCity[];
  currentCity: TCity | undefined;
  isLoading: boolean;
  getCity: (id: string) => void;
  createCity: (newCity: Omit<TCity, "id">) => void;
};

export const CitiesContext = createContext<CitiesContextType | null>(null);
