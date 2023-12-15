//Tile.tsx

import Wind from './Icons/Wind';
import Feels_Like from './Icons/Feels_Like.tsx';
import Humidity from './Icons/Humidity';
import Pop from './Icons/Pop';
import Pressure from './Icons/Pressure';
import Visibility from './Icons/Visibility';
import { WeatherInfoType } from '../types/types.ts';

export type iconComponentNamesType = {
  string: JSX.Element;
};

const iconComponentNames = {
  wind: Wind,
  feels_like: Feels_Like,
  humidity: Humidity,
  pop: Pop,
  pressure: Pressure,
  visibility: Visibility,
};

const Tile = ({
  icon,
  title,
  info,
  description,
}: WeatherInfoType): JSX.Element => {
  const IconComponent = iconComponentNames[icon];

  return (
    <>
      <article className='Tile tile-today'>
        <div className='tile-icon-title'>
          <div className='icon-component'>
            <IconComponent />
          </div>

          <h4 className='tile-title'>{title}</h4>
        </div>

        <div className='tile-info'>{info}</div>
        <div className='tile-description'> {description}</div>
      </article>
    </>
  );
};

export default Tile;
