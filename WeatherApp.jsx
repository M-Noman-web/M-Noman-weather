import React, { useState } from "react";
import "../App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "23870e5d6573b466f5f8f7c1fa1d75e0";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please Enter a city");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();

      setWeather({
        name: data.name,
        temp: (data.main.temp - 273.5).toFixed(2),
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  // Fetch 7 days.....

  return (
    <div className="weatherCont">
      <h1 className="weatherHead">Weather App</h1>
      <input
        className="weatherInput"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
      />
      <button className="weatherBtn" onClick={fetchWeather}>
        Get Weather
      </button>

      {loading && <h4>Loading...</h4>}

      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          {error}
        </p>
      )}

      {weather && (
        <div className="weather-info">
          <h3>City: {weather.name}</h3>
          <img src={weather.icon} alt="Weather Icon" className="weather-icon" />
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.description}</p>
          <p>Humidity: {weather.humidity}% 💧</p>
          <p>Wind Speed: {weather.windSpeed} m/s 🌬️</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
