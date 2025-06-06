import { useEffect, useReducer } from "react";
import type { TCity, Action } from "../types";
import { useLocalStorageState } from "./useLocalStorageState";

// State type
type State = {
  cities: TCity[];
  isLoading: boolean;
  currentCity: TCity | undefined;
  error: string;
};

const initState = {
  cities: [],
  isLoading: false,
  currentCity: undefined,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: state.cities.find((c) => c.id === action.payload),
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
        currentCity: state.currentCity?.id === action.payload ? undefined : state.currentCity,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unkown action type");
  }
}

export function useCityReducerWithLocalStorage(key: string, initialCities: TCity[]) {
  const [storedCities, setStoredCities] = useLocalStorageState<TCity[]>(initialCities, key);

  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    cities: storedCities,
  });

  // Synchronisierung mit LocalStorage
  useEffect(() => {
    setStoredCities(state.cities);
  }, [state.cities, setStoredCities]);

  return [state, dispatch] as const;
}
