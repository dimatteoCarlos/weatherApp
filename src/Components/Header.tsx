const Header = () => {
  return (
    <>
      <header>
        <h1 className={`title`}>
          Weather <span className='font-black'>Forecast</span>
        </h1>
        <p className={`msg`}>
          Enter the place to know the weather forecast and select an option from
          the dropdown menu
        </p>
      </header>
    </>
  );
};

export default Header;
