const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '23988cb1e4124886ce6562784918a834';

const makeIconURL = iconId =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeather = async (city, units = 'metric') => {
  return await fetch(
    `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=${units}`
  )
};

const getFormattedWeatherData = data => {
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    weather,
    country,
    name,
  };
};


export { getWeather, getFormattedWeatherData };
