//Forecast.tsx
import Degree from './Degree';
import { Forecast as ForecastType } from '../interfaces/interfaces.ts';
import Sunrise from './Icons/Sunrise.tsx';
import Sunset from './Icons/Sunset.tsx';

import {
  getWindDirection,
  getHumidityValue,
  getVisibilityValue,
  getSunTime,
  getPop,
  feelsTemp,
  getPressure,
} from '../helpers/helpers';

import Tile from './Tile.tsx';

export type WeatherInfoType = {
  icon: 'wind' | 'feels_like' | 'humidity' | 'pop' | 'pressure' | 'visibility';
  title: string;
  info: string | JSX.Element;
  description: string;
};

type ForecastPropType = {
  forecastData: ForecastType;
};

const Forecast = ({ forecastData }: ForecastPropType): JSX.Element => {
  //-------------------------
  //General Weather Data
  const { name: city, country, sunrise, sunset } = forecastData.city;

  //TODAYS WEATHER INFO

  const { main, wind, pop, visibility, weather } = forecastData?.list![0];

  const { main: mainWeather, icon, description } = weather![0];

  const { temp, feels_like, temp_min, temp_max, humidity, pressure } = main;

  const { speed, deg, gust } = wind;
  //---------------------------------
  //Gathering todays weather info
  const sunTimeInfo = {
    sunrise: getSunTime(sunrise),
    sunset: getSunTime(sunset),
  };

  //WeatherInfoType
  const weatherInfoArray: WeatherInfoType[] = [
    {
      icon: 'wind',
      title: 'Wind',
      info: `${speed.toFixed(1)} km/h`,
      description: `${getWindDirection(deg)}, gusts: ${Math.round(gust)} km/h`,
    },

    {
      icon: 'feels_like',
      title: 'Feels like',
      info: <Degree x={feels_like.toFixed(1)}></Degree>,
      description: `Feels ${feelsTemp(
        temp,
        +Number.parseFloat(feels_like.toFixed(1))
      )}`,
    },

    {
      icon: 'humidity',
      title: 'Humidity',
      info: `${Math.round(humidity)} %`,
      description: `${getHumidityValue(Math.round(humidity))}`,
    },
    {
      icon: 'pop',
      title: 'Precipitation',
      info: `${Math.round(pop * 100)} %`,
      description: `${getPop(pop)}`,
    },
    {
      icon: 'visibility',
      title: 'Visibility',
      info: `${Math.round(visibility)} km`,
      description: `${getVisibilityValue(Math.round(visibility))}`,
    },
    {
      icon: 'pressure',
      title: 'Pressure',
      info: `${Math.round(pressure)} hPa`,
      description: `${getPressure(Math.round(pressure))} Standard`,
    },
  ];

  // console.log('WeatherInfo:', weatherInfoArray);

  //-------------------------
  //Array of forecast Values to render
  const forecastResults = forecastData?.list!.map((item) => {
    return {
      date: item.dt_txt,
      temp: item.main.temp,

      dt: item.dt,
      icon: item.weather![0].icon,
      main: item.weather![0].main,
      description: item.weather![0].description,
    };
  });

  // console.log({ forcastInfo: forecastResults });
  //------------------------

  return (
    <>
      <div
        className='forecast-container
          '
      >
        <div
          className='forecast-info
            '
        >
          <section className='todays-weather text-center'>
            <h2 className='place-name'>
              {city}
              <span className='country font-thin'>, {country}</span>
            </h2>

            <div className='todays-temp '>
              <img
                className='current-icon'
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={`weather-icon: ${icon}`}
              />

              <span className='todays-temp'>
                {Number.parseFloat(temp.toString()).toFixed(1)}
                <sup>
                  <span
                    className='temp-unit'
                    style={{ fontWeight: '500', fontSize: '1.2rem' }}
                  >
                    °C
                  </span>
                </sup>
              </span>
              <div className='weather-description'>
                {`${mainWeather} (${description})`}
              </div>
            </div>

            <p className='hi-lo'>
              {`High: ${Math.ceil(temp_max)}`}
              <sup>o</sup>
              {` - Low: ${Math.floor(temp_min)}`}
              <sup>o</sup>
            </p>
          </section>

          <section className='forecast-results '>
            {forecastResults.map((item, indx) => (
              <div className='forecast-item' key={indx}>
                <div className='img-desc'>
                  <p className='forecast-date'>
                    {indx === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
                  </p>
                  <img
                    className='forecast-icon'
                    src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    alt={`weather-icon: ${item.icon}`}
                  />

                  <div className='forecast-temp'>
                    <Degree
                      x={Number.parseFloat(item.temp.toString()).toFixed(1)}
                    ></Degree>
                  </div>
                  <div className='forecast-desc'>{item.description}</div>
                </div>
              </div>
            ))}
          </section>

          <section className='todays-info'>
            <div className='today-details Tile'>
              <Sunrise />
              <span className='sun-time'> {sunTimeInfo.sunrise}</span>
            </div>

            <div className='Tile'>
              <Sunset />
              <span className='sun-time'>{sunTimeInfo.sunset}</span>
            </div>

            {weatherInfoArray.map((item, indx) => (
              <Tile {...item} key={indx} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Forecast;
