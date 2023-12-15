//useForecast.tsx
import { useState, useEffect } from 'react';

import { optionType as GeoOptionType } from '../types/types.ts';

import { Forecast as ForecastType } from '../interfaces/interfaces.ts';

import { URL_BASE } from '../urlConstants';

//-----Custom Hook: useForecast------
const useForecast = () => {
  const [placeInput, setPlaceInput] = useState<string>('');
  //------states---------------
  const [options, setOptions] = useState<[]>([]);
  const [cityData, setCityData] = useState<GeoOptionType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);

  //-------------------------

  //--functions-----
  async function getGeoOptions(place: string) {
    if (place.trim().length == 0) {
      console.warn('blanks are not accepted');
      setPlaceInput('');
      return;
    }

    const urlGeo = `${URL_BASE}/geo/1.0/direct?q=${place.trim()}&limit=10&appid=${
      import.meta.env.VITE_API_WEATHER_KEY
    }`;

    fetch(urlGeo)
      .then((res) => res.json())
      .then((data) => {
        if (data.length == 0) {
          console.warn(
            '%cnon data found',
            'color:red;height:15px;font-weight:bold; font-size:15px;'
          );
          return;
        }
        setOptions(data);
      })
      .catch((e) => console.warn(e));
  }

  //------------------------------
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const valueEntered = e.target.value;

    if (valueEntered == '') return;

    setPlaceInput(valueEntered);
  }
  //------------------
  const onOptionSelect = (option: GeoOptionType) => {
    if (option?.lat == undefined || option?.lon == undefined) {
      console.warn('coordinates are undefined');
      return;
    }
    console.info(
      '%cCoordinates: ',
      'color:red',
      'longitude:',
      option.lon,
      'latitude:',
      option.lat
    );
    setCityData(option);
  };

  //----------------------
  async function getForecast(lat: number, lon: number) {
    const urlForecast = `${URL_BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_WEATHER_KEY
    }&units=metric`;
    //----------------
    fetch(urlForecast)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod == 200) {
          //get the needed forecast info

          let forecastInfoRequired: ForecastType = {
            city: { ...data.city }, //city:data.city
            cnt: data.cnt,
            cod: data.cod,
            message: data.message,
            list: data.list.slice(0, 16),
          };

          setForecast(forecastInfoRequired);
        } else {
          throw new Error('Something went Wrong fetching forecast data');
        }
      })
      .catch((e) => console.warn(e));
  }
  //-----------------------------
  const onSubmit = () => {
    if (!cityData) {
      console.info(
        '%c please re-entered or select the place',
        'color:lightgreen;font-weight:bold;background-color:black;line-height:2rem;padding:10px'
      );
      return;
    }
    getForecast(cityData.lat, cityData.lon);
  };

  //-----------------------------
  //Debouncing
  useEffect(() => {
    if (!Boolean(placeInput) || Boolean(cityData)) return;

    const timerToGetInputData = setTimeout(() => {
      getGeoOptions(placeInput);
    }, 1000);

    return () => clearTimeout(timerToGetInputData);
  }, [placeInput]);

  //---------------------------
  //Preparing to call forecast api,
  //Notice the separate usage of placeInput and cityData.name

  useEffect(() => {
    if (!Boolean(cityData?.name.trim())) {
      console.info(
        '%cNo info has been entered yet',
        'color:white; font-weight:bold; background-color:blue;padding:5px; border-radius:5px; border:1px doubled cyan; '
      );
      return;
    }

    setPlaceInput(cityData!.name);

    setOptions([]);
  }, [cityData]);

  //-------------------------

  return {
    placeInput,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit,

    forecast,
  };
};

export default useForecast;
