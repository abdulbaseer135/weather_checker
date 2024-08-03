// WeatherContext.js
import React, { createContext, useState, useRef } from 'react';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon,
    };

    const searchWeather = async (city) => {
        const apiKey = process.env.REACT_APP_ID;
       
        if (city === "") {
            toast.error("Enter City Name!");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message);
                setWeatherData(null);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });

            inputRef.current.value = ""; // Clear input field
        } catch (error) {
            console.error("Error fetching weather data:", error);
            toast.error("An error occurred while fetching data.");
            setWeatherData(null);
            inputRef.current.value = ""; // Clear input field
        }
    };

    return (
        <WeatherContext.Provider value={{ weatherData, searchWeather, inputRef }}>
            {children}
        </WeatherContext.Provider>
    );
};

export { WeatherContext, WeatherProvider };
