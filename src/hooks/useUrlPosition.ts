import { useSearchParams } from "react-router";

export function useUrlPosition(): [number, number] {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [Number(lat), Number(lng)];
}
