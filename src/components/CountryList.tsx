import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

import type { City } from "../types";
import CountryItem from "./CountryItem";
import Message from "./Message";

type CountryListPops = {
  isLoading: boolean;
  cities: City[];
};

function CountryList({ cities, isLoading }: CountryListPops) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking one on the map" />;

  const uniqueCountries = cities.reduce((acc, city) => {
    if (!acc.some((item) => item.name === city.country)) {
      acc.push({
        name: city.country,
        id: city.id,
        emoji: city.emoji,
      });
    }
    return acc;
  }, [] as { name: string; id: number; emoji: string }[]);

  console.log(uniqueCountries);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}

export default CountryList;
