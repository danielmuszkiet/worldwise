import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import CountryImage from "./CountryImage";
import Message from "./Message";
import Spinner from "./Spinner";

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [mapLat, mapLng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const emoji = convertToEmoji(countryCode);

  useEffect(() => {
    async function fetchCityDate() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "The selected location does not seem to be a city. Click somewhere else 🌏"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode);
      } catch (err) {
        if (err instanceof Error) {
          setGeoCodingError(err.message);
        } else {
          setGeoCodingError("An unknown error occurred.");
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityDate();
  }, [mapLat, mapLng]);

  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>
          {<CountryImage name={country} countrycode={emoji} size="h20" />}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toDateString()}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button children="Add" type="primary" />
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
