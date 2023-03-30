import hotBg from '../assets/hot.jpg';
import { useEffect, useState } from 'react';
import { getWeather, getFormattedWeatherData } from 'services/weatherService';
import coldBg from '../assets/cold.jpg';
import Descriptions from './Descriptions/Descriptions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [city, setCity] = useState('kiev');
  const [bg, setBg] = useState(hotBg);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const query = await getWeather(city, units)
        .then(res => {
          console.log(res);

          if (!res.ok) {
            console.log(res);
            setError(true);
            setCity('kiev');
            throw new Error('Error');
          } else {
            return res.json();
          }
        })
        .then(data => {
          return getFormattedWeatherData(data);
        })
        .catch(e => {
          console.log(e.message);
        });

      setWeather(query);

      if (error === true) {
        toast.warn('🦄 Wow so easy!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      const threshold = units === 'metric' ? 20 : 60;
      if (query.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city, error]);

  const handleUnitsClick = e => {
    const button = e.currentTarget;
    const currentUnit = e.currentTarget.innerText.slice(11);
    if (currentUnit === 'C') {
      button.innerText = 'Switch to °F';
      return setUnits('metric');
    }
    if (currentUnit === 'F') {
      button.innerText = 'Switch to °C';
      return setUnits('imperial');
    }
  };

  const enterKeyPressed = e => {
    if (e.key === 'Enter') {
      setCity(e.currentTarget.value.trim());
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          theme="light"
        />
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={e => handleUnitsClick(e)}>Switch to °F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === 'metric' ? 'C' : 'F'
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};
