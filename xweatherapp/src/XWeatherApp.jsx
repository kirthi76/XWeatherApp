import React, { useState } from 'react';


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


  return (
    <div>
      <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}   placeholder="Enter city name"/>
      <button onClick={fetchData}>Search</button>
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-card">
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Wind Speed: {weatherData.current.wind_mph} mph</p>
        </div>
      )}
    </div>
  );
};


export default XWeatherApp;