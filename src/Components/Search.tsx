//Search.tsx

import { optionType } from '../types/types';

import Header from './Header';

type SearchPropsType = {
  placeInput: string;
  options: [];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

function Search({
  placeInput,
  options,

  onInputChange,
  onOptionSelect,
  onSubmit,
}: SearchPropsType): JSX.Element {
  //-------------------------

  return (
    <>
      <section className={`section1`}>
        <Header></Header>

        <div className='form'>
          <input
            type='text'
            value={placeInput}
            onChange={onInputChange}
            autoFocus={true}
            className={`place`}
          />

          <ul id='select' className={`select`}>
            {options?.map((option: optionType, indx: number) => (
              <li key={option?.name + '-' + indx}>
                <button
                  className={`option`}
                  onClick={() => onOptionSelect(option)}
                >
                  {option?.name}, {option?.country}
                </button>
              </li>
            ))}
          </ul>

          <button className={`btn`} onClick={onSubmit}>
            search
          </button>
        </div>
      </section>
    </>
  );
}

export default Search;
