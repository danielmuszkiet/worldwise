import { useNavigate } from "react-router";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import styles from "./Map.module.css";
import type { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/useCities";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState<LatLngTuple>([48.777106, 9.180769]);

  const {
    position: geoLocationPosition,
    getPosition,
    isLoading: isLoadingPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading" : "Go to your position"}
      </Button>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngTuple }) {
  const map = useMap();
  map.setView(position, map.getZoom(), { animate: true });

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}

export default Map;
