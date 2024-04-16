import React, { useState } from 'react';
import "./XWeatherApp.css";

const XWeatherApp = () => {
  
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
   
    setLoading(true);
    const apiKey = '824d7cc039b646af917235428233008';
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      if (res.ok) {
        const data = await res.json();
        setWeatherData(data);
      } else {
        alert('Failed to fetch weather data');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather data');
    }
    setLoading(false);
  };

  const WeatherCard = ({ title, data }) => {
    return (
      <div className="weather-card">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    );
  };
  return (
    <div>
      <input className="searchBar" type="text" value={city} onChange={(e)=>setCity(e.target.value)}   placeholder="Enter city name"/>
      <button onClick={fetchData}>Search</button>
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
        <WeatherCard
          title="Temperature"
          data={`${weatherData.current.temp_c}°C`}
        />
        <WeatherCard
          title="Humidity"
          data={`${weatherData.current.humidity}%`}
        />
        <WeatherCard
          title="Condition"
          data={weatherData.current.condition.text}
        />
        <WeatherCard
          title="Wind Speed"
          data={`${weatherData.current.wind_kph} kph`}
        />
      </div>
      )}
    </div>
  );
};


export default XWeatherApp;