export type optionType = {
  name: string;
  lat: number;
  lon: number;

  local_names?: [] | null | undefined;
  country: string;
  state: string;
} | null;

//FORECASTTYPE
export type forecastType = {
  //city contains name, country, sunrise and sunset
  name: string;
  country: string;
  list: [
    {
      dt: number;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };

      weather: [
        {
          main: string;
          icon: string;
          description: string;
        }
      ];

      wind: {
        speed: number;
        gust: number;
        deg: number;
      };

      clouds: {
        all: number;
      };

      pop: number;
      visibility: number;
    }
  ];
  sunrise: number;
  sunset: number;
};

//TODAYS WEATHER INFO
export type WeatherInfoType = {
  icon: 'wind' | 'feels_like' | 'humidity' | 'pop' | 'pressure' | 'visibility';
  title: string;
  info: string | JSX.Element;
  description: string;
};
