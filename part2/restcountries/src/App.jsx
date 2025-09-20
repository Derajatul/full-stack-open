import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // fetch countries data from https://studies.cs.helsinki.fi/restcountries/api/all
  // fetch weather data from https://openweathermap.org/
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (filter.length === 0) {
        setWeather(null);
        return;
      }

      try {
        setLoadingWeather(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${filter}&appid=${
            import.meta.env.VITE_SOME_KEY
          }`
        );
        setWeather(response.data);
        setLoadingWeather(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }

      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );
      const numFilteredCountries = filteredCountries.length;
      if (numFilteredCountries === 1) {
        const country = filteredCountries[0];
        try {
          setLoadingWeather(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=YOUR_API_KEY`
          );
          setWeather(response.data);
          setLoadingWeather(false);
        } catch (error) {
          setLoadingWeather(false);
          console.error("Error fetching weather data:", error);
        }
      } else {
        setWeather(null);
      }
    };

    fetchWeather();
  }, [filter, countries]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const numFilteredCountries = filteredCountries.length;

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find countries{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <ul>
        {numFilteredCountries > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : numFilteredCountries === 1 ? (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area}</p>
              <h3>Languages:</h3>
              <ul>
                {Object.values(country.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width="200"
              />
              {/* show weather */}
              <h2>Weather in {country.capital}</h2>
              {loadingWeather ? (
                <p>Loading weather data...</p>
              ) : weather ? (
                <div>
                  <p>Temperature: {weather.main.temp}K</p>
                  <p>Wind: {weather.wind.speed} m/s</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                  />
                </div>
              ) : (
                <p>No weather data available.</p>
              )}
            </div>
          ))
        ) : (
          filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setFilter(country.name.common)}>
                show
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
