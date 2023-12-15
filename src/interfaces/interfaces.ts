//interface.ts

export type Forecast = {
  cod: string;
  message: number;
  cnt: number;
  list?: ListEntity[] | null;
  city: City;
};
export type ListEntity = {
  dt: number;
  main: Main;
  weather?: WeatherEntity[] | null;
  wind: Wind;
  clouds: Clouds;
  visibility: number;
  pop: number;
  dt_txt: string;
};
export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  //-----------------
  temp_kf: number;
  sea_level: number;
  grnd_level: number;
};
export type WeatherEntity = {
  main: string;
  icon: string;
  description: string;
  //------------------
  id: number;
};

export type Clouds = {
  all: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

export type City = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  coord: Coord;
  //-------------
  id: number;
  population: number;
  timezone: number;
};

export interface Coord {
  lat: number;
  lon: number;
}
