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
  const [currentCity, setCurrentCity] = useState<TCity | undefined>();

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

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: Omit<TCity, "id">) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
