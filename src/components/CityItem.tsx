import CountryImage from "./CountryImage";

import styles from "./CityItem.module.css";

import type { TCity } from "../types";
import { Link } from "react-router";
import { useCities } from "../contexts/useCities";

type CityItem = {
  city: TCity;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: CityItem) {
  const { currentCity, dispatch } = useCities();

  const { emoji, cityName, date, id, country, position } = city;

  function handleRemoveCity(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch({ type: "city/deleted", payload: id });
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity?.id === id ? styles["cityItem--active"] : ""}`}
      >
        <span className={styles.emoji}>
          <CountryImage countrycode={emoji} size="h20" name={country} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleRemoveCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
