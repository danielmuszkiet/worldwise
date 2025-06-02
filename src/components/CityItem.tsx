import CountryImage from "./CountryImage";

import styles from "./CityItem.module.css";

import type { TCity } from "../types";
import { Link } from "react-router";

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
  const { emoji, cityName, date, id, country, position } = city;

  return (
    <li>
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
        <span className={styles.emoji}>
          <CountryImage countrycode={emoji} size="h20" name={country} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
