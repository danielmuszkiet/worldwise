import { useState } from "react";

type Position = {
  lat: number;
  lng: number;
} | null;

export function useGeolocation(defaultPostition: Position = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position>(defaultPostition);
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation) return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
