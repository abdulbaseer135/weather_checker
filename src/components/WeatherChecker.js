// WeatherChecker.js
import React, { useContext, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import './Weather.css';
import search_icon from '../Assets/search.png';
import humidity from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeatherChecker = () => {
    const { weatherData, searchWeather, inputRef } = useContext(WeatherContext);

    useEffect(() => {
     
    }, [searchWeather]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchWeather(inputRef.current.value);
        }
    };


  



    return (
        <div className='weather'>
            <h2>Weather Checker App</h2>
            <div className="search-bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Search here'
                    onKeyDown={handleKeyDown}
                />
                <img src={search_icon} alt="search" onClick={() => searchWeather(inputRef.current.value)} />
            </div>
            <ToastContainer className="toastpart"/>
            {weatherData ? (
                <>
                    <img className='weather_icon' src={weatherData.icon} alt="weather icon" />
                    <h2>{weatherData.temperature} °c</h2>
                    <p>{weatherData.location}</p>
                    <div className="weather-status">
                        <div className="col">
                            <img src={humidity} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="wind" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) :null
            }

        </div>
    );
};

export default WeatherChecker;
