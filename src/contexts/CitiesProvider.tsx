import { useState } from "react";
import { CitiesContext } from "./CitiesContext";
import type { TCity } from "../types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type CitiesProviderPops = {
  children: React.ReactNode;
};

export function CitiesProvider({ children }: CitiesProviderPops) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<TCity | undefined>();
  const [cities, setCities] = useLocalStorageState<TCity[]>([], "cities");

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const city = cities.find((c) => c.id === id);
      setCurrentCity(city);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id: string) {
    // TODO
  }

  async function createCity(newCity: Omit<TCity, "id">) {
    try {
      setIsLoading(true);
      setCities((c) => [...c, { ...newCity, id: (c.length + 1).toString() }]);
    } catch {
      alert("There was an error adding data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity, removeCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
