import styles from "./CityList.module.css";
import Spinner from "./Spinner";

import type { TCity } from "../types";
import CityItem from "./CityItem";
import Message from "./Message";

type CityListProps = {
  isLoading: boolean;
  cities: TCity[];
};

function CityList({ cities, isLoading }: CityListProps) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking one on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
