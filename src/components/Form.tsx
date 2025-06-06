import { useEffect, useRef, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import CountryImage from "./CountryImage";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/useCities";
import { useNavigate } from "react-router";

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const [mapLat, mapLng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");

  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const plusCode = useRef("");

  const navigate = useNavigate();

  const emoji = convertToEmoji(countryCode);

  useEffect(() => {
    if (!mapLat || !mapLng) return;
    async function fetchCityDate() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
        const data = await res.json();
        console.log(data);

        if (!data.countryCode)
          throw new Error(
            "The selected location does not seem to be a city. Click somewhere else 🌏"
          );

        plusCode.current = data.plusCode;
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCityObj = {
      cityName,
      country,
      emoji,
      date: date.toString(),
      notes,
      position: { lat: mapLat, lng: mapLng },
      id: plusCode.current,
    };

    await createCity(newCityObj);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!mapLat || !mapLng) return <Message message="Start by clicking somewhere on the Map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
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
          type="date"
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date?.toISOString().split("T")[0]}
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
