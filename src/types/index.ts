export type TCity = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
};

// Action type
export type Action =
  | { type: "loading" }
  | { type: "city/deleted"; payload: string }
  | { type: "city/created"; payload: TCity }
  | { type: "city/loaded"; payload: string }
  | { type: "rejected"; payload: string };

export type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
