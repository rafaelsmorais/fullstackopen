import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages)
  const capital = Array.isArray(country.capital) ? country.capital.join(', ') : country.capital

  useEffect(() => {
    weatherService.getWeather(capital)
      .then(request => setWeather(request))
  }, [capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {country.area}km2</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      {weather !== null &&
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      }
    </div>
  )
}

export default CountryDetails;
