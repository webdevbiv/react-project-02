import hotBg from '../assets/hot.jpg';
import coldBg from '../assets/cold.jpg';
import { useEffect, useState } from 'react';
import { getWeather, getFormattedWeatherData } from 'services/weatherService';
import Descriptions from './Descriptions/Descriptions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState('metric');
  const [city, setCity] = useState('kiev');
  const [bg, setBg] = useState(hotBg);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getWeather(city, units)
        .then(res => {
          if (!res.ok) {
            throw new Error('Error');
          } else {
            return res.json();
          }
        })
        .then(data => {
          if (data.cod === 200) {
            console.log(data);
            setWeather(getFormattedWeatherData(data));
            setShowContent(true);
            const threshold = units === 'metric' ? 20 : 60;
            data.main.temp <= threshold ? setBg(coldBg) : setBg(hotBg);
          }
        })
        .catch(e => {
          console.log(e.message);
          setWeather(null);
          toast.warn('No Such City', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'dark',
          });
        });
    };

    fetchWeatherData();
  }, [units, city]);

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
      setWeather(null);
      setShowContent(false);
      setCity(e.currentTarget.value.trim());
      e.currentTarget.blur();
    }
  };

  //
  // if (weather !== null && weather.temp <= threshold) setBg(coldBg);
  // else setBg(hotBg);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="light"
      />
      <div className="overlay">
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

          {showContent && (
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.tempFixed} °${
                  units === 'metric' ? 'C' : 'F'
                }`}</h1>
              </div>
            </div>
          )}
          {showContent && <Descriptions weather={weather} units={units} />}
        </div>
      </div>
    </div>
  );
  //  return (
  //
  //

  //     </div>
  // </div>
  //  );
};
