import React from 'react';
import WeatherChecker from './components/WeatherChecker';
import { WeatherProvider } from './context/WeatherContext';

function App() {
    return (
        <WeatherProvider>
            <WeatherChecker />
        </WeatherProvider>
    );
}

export default App;
