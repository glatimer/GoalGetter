import React, { useState, useEffect } from 'react';
import './index.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '53675578cd9b4541826173002241705'; // Replace with your WeatherAPI.com API key
  const city = 'USA'; // You can change the city or make it dynamic

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [API_KEY, city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-container">
      {weatherData.forecast.forecastday.map((day, index) => (
        
        <div key={index} className="weather-card">
          <div className="day">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <div className="temp">
            {Math.round(day.day.maxtemp_c)}°C / {Math.round(day.day.mintemp_c)}°C
          </div>
          <div className="icon">
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
          </div>
          <div className="condition">{day.day.condition.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
