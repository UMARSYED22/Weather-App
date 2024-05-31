import React, { useState } from "react";
import "./weather.css"

const api = {
  key: "d8dfc9e22496545221cec8ca7c00cf12",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [Query, SetQuery] = useState("");
  const [Weather, SetWeather] = useState([]);
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${Query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          SetWeather(result);
          SetQuery("");
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof Weather.main != "undefined")?((Weather.main.temp>16)?"app-warm":"app"):"app"}>
      <main>
        <div className="search-box">
          <input
            className="search-bar
              "
            type="text"
            placeholder="Search.."
            value={Query}
            onChange={(e) => SetQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        <div/>
        {typeof Weather.main != "undefined" ? (
          <div className="location-box">
            <div className="location">
              {Weather.name},{Weather.sys.country}
              </div>
            <div className="date">{dateBuilder(new Date())}</div>
            
            
            <div className="weather-box">
              <div className="temp">{Math.round(Weather.main.temp)}°C</div>
              <div className="weather">{Weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          " "
        )}
      </main>
    </div>
  );
};

export default Weather;
