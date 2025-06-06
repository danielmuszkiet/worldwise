import { CitiesContext } from "./CitiesContext";
import { useCityReducerWithLocalStorage } from "../hooks/useCityReducerWithLocalStorage";

type CitiesProviderPops = {
  children: React.ReactNode;
};

const initalCityItem = [
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
  const [{ cities, isLoading, currentCity }, dispatch] = useCityReducerWithLocalStorage(
    "cities",
    initalCityItem
  );

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, dispatch }}>
      {children}
    </CitiesContext.Provider>
  );
}
