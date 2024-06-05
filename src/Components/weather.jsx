import React, { useState, useEffect } from "react";
import axios from "axios";
import AirQuality from "./airQuality";
//import "../index.css";

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
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${submittedCity}&days=7&aqi=no&alerts=no`
        );
        if (response.data.error) {
          throw new Error(response.data.error.message);
        }
        setWeatherData(response.data);
        setError(null); // Clear any previous error
      } catch (error) {
        setError("Nqot found");
        setWeatherData(null); // Clear previous weather data on error
      } finally {
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
      <h3 className="weatherHead">Weather Information</h3>
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
      {error && <div className="load"> {error}</div>}
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
           <div className="aqi">
            <div className="container">
              <AirQuality aqiData={weatherData.current.air_quality} />
            </div>
          </div>
          </div>
      )}
    </div>
  );
}
