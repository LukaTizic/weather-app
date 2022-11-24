import { FaSearch, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

// const API_KEY = 895284fb2d2c50a520ea537456963d9c;
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=52027db2366aa0d36c54d31325690e4e`
      );
      setData(response.data);
      console.log(response.data);
      setLocation("");
    } catch (error) {
      alert("Please provide value");
    }
  };

  return (
    <div className='App'>
      <div className='header'>
        <h1 className='title'>Weather App</h1>
      </div>
      <div className='input-field'>
        <input
          value={location}
          type='text'
          placeholder='Please enter city'
          onChange={handleChange}
        />
        <button className='btn' onClick={getWeather}>
          <FaSearch />
        </button>
      </div>
      <div className='container'>
        <div>
          <h1 className='city-name'>{data.name}</h1>
          {data.sys ? <h2 className='country'>{data.sys.country}</h2> : null}
        </div>
        <div className='grid-container'>
          <div className='grid-field'>
            <p className='temp'>
              Current temperature:
              <br />
              {data.main ? (
                <span>{Math.trunc(data.main.temp - 273.15)}</span>
              ) : null}
              <FaTemperatureHigh />C
            </p>

            <p className='temp-feels'>
              Feels like:
              <br />
              {data.main ? (
                <span>{Math.trunc(data.main.feels_like - 273.15)}</span>
              ) : null}
              <FaTemperatureHigh />C
            </p>
            <p className='min-temp'>
              Min temperature: <br />
              {data.main ? (
                <span>{Math.trunc(data.main.temp_min - 273.15)}</span>
              ) : null}
              <FaTemperatureLow />C
            </p>
            <p className='max-temp'>
              Max temperature:
              <br />
              {data.main ? (
                <span>{Math.trunc(data.main.temp_max - 273.15)}</span>
              ) : null}
              <FaTemperatureHigh />C
            </p>
          </div>
          <div className='grid-field'>
            <h1>Current weather</h1>
            {data.weather ? (
              <p className='current-weather'>{data.weather[0].main}</p>
            ) : null}
          </div>
          <div className='grid-field'>
            <p className='pressure'>
              Pressure: <br />
              {data.main ? <span>{data.main.humidity}</span> : null}hPa
            </p>
            <p>
              Humidity:
              <br />
              {data.main ? <span>{data.main.humidity}</span> : null}%
            </p>
            <p>
              Visibility:
              <br />
              {data.visibility ? <span>{data.visibility / 1000}</span> : null}km
            </p>
            <p>
              Clouds: <br />
              {data.clouds ? <span>{data.clouds.all}</span> : null}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
