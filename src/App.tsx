import useForecast from './hooks/useForecast';
import Search from './Components/Search';
import Forecast from './Components/Forecast';

function App(): JSX.Element {
  const {
    //Search props:
    placeInput,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit,

    //Forecast props:
    forecast,
  } = useForecast();

  return (
    <>
      <main className={`main`}>
        {forecast! ? (
          <Forecast forecastData={forecast}></Forecast>
        ) : (
          <Search
            placeInput={placeInput}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          ></Search>
        )}
      </main>
    </>
  );
}

export default App;
