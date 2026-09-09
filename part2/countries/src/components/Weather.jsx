import { useState, useEffect } from "react"
import axios from 'axios';

const Weather = ({ latlng, capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (latlng === undefined || capital.length === 0) return;

    const [lat, lng] = latlng;

    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`
      )
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log("failed to fetch weather data.", error);
      });
  }, [latlng, capital]);

  if (weather === null) return null;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        Temperature {weather.current.temperature_2m}
        {weather.current_units.temperature_2m}
      </p>
      <p>
        Wind speed {weather.current.wind_speed_10m}
        {weather.current_units.wind_speed_10m}
      </p>
    </div>
  );
};

export default Weather