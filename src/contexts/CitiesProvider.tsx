import { useEffect, useState } from "react";
import { CitiesContext } from "./CitiesContext";
import type { TCity } from "../types";

type CitiesProviderPops = {
  children: React.ReactNode;
};

const BASE_URL = "http://localhost:8000";

export function CitiesProvider({ children }: CitiesProviderPops) {
  const [cities, setCities] = useState<TCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading, setCities, setIsLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}
