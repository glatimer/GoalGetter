// weather.jsx is parent to air-quality and uv-index componenets to ensure one fetch for many components
import React, { useState, useEffect } from "react";
import AirQuality from "./airQuality";
import "../index.css";
import UVIndex from "./uvIndex";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");

  const API_KEY = "53675578cd9b4541826173002241705";
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!submittedCity) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${submittedCity}&days=7&aqi=yes&alerts=no`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
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
  }, [submittedCity, API_KEY]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedCity(city);
    setError(null);
    setWeatherData(null);
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="city-input"
        />
        <button type="submit" className="submit-button">
          Search
        </button>
      </form>

      {loading && <div className="load">Loading...</div>}
      {error && <div className="load">Error: {error}</div>}
      {weatherData && (
        <div className="weather-cards">
          {weatherData.forecast.forecastday.map((day, index) => (
            <div key={index} className="weather-card">
              <div className="day">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
              <div className="temp">
                {Math.round(day.day.maxtemp_c)}°C /{" "}
                {Math.round(day.day.mintemp_c)}°C
              </div>
              <div className="icon">
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
              </div>
              <div className="condition">{day.day.condition.text}</div>
            </div>
          ))}
        </div>
      )}
      {weatherData && (
        <div className="gauge-container">
          <div className="aqi">
            <AirQuality aqiData={weatherData.current.air_quality} />
          </div>
          <div className="uv-index">
            <UVIndex uvData={weatherData.current.uv} />
          </div>
        </div>
      )}
    </div>
  );
}
