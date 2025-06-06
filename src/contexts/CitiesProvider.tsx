import { useState } from "react";
import { CitiesContext } from "./CitiesContext";
import type { TCity } from "../types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type CitiesProviderPops = {
  children: React.ReactNode;
};

const initalState = [
  {
    cityName: "Stuttgart",
    country: "Germany",
    emoji: "🇩🇪",
    date: "Fri Jun 06 2025 15:16:07 GMT+0200 (Mitteleuropäische Sommerzeit)",
    notes: "Here it all began...",
    position: { lat: 48.77652485814117, lng: 9.179506301879885 },
    id: "8FWFQ5GH+JR",
  },
];

export function CitiesProvider({ children }: CitiesProviderPops) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<TCity | undefined>();
  const [cities, setCities] = useLocalStorageState<TCity[]>(initalState, "cities");

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
    setCities((prev) => prev.filter((c) => c.id !== id));
  }

  async function createCity(newCity: TCity) {
    try {
      setIsLoading(true);
      setCities((c) => [...c, newCity]);
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
