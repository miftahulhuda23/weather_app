import React, { useState } from "react";
import Input from "../Input/Input";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState({
    kota: "",
    description: "",
    temperature: "",
    temp_max: "",
    temp_min: "",
    wind: "",
    icon: "",
  });

  const [loading, setLoading] = useState(true);

  const submit = (value, e) => {
    setLoading(true);
    const kota = value.city;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=bde80c8749fea2d9c620431cbeb8a9da
      `
      )
      .then((response) => {
        setData({
          kota: response.data.name,
          description: response.data.weather[0].description,
          temperature: Math.floor(response.data.main.temp - 275.15),
          wind: response.data.wind.speed,
          temp_max: Math.floor(response.data.main.temp_max - 275.15),
          temp_min: Math.floor(response.data.main.temp_min - 275.15),
          icon: response.data.weather[0].id,
        });
        console.log(response.data);
        setLoading(false);
      });
  };

  const icon = () => {
    const id = data.icon;
    if (id >= 200 && id <= 232) {
      return ("wi-day-thunderstorm")
    } else if (id >= 300 && id <= 321) {
      return ("wi-day-Drizzle")
    } else if (id >= 500 && id <= 531) {
      return ("wi-day-Rain")
    } else if (id >= 600 && id <= 622) {
      return ("wi-day-Snow")
    } else if (id >= 701 && id <= 781) {
      return ("wi-day-Atmosphere")
    } else if (id === 800) {
      return ("wi-day-Clear")
    } else if (id >= 801 && id <= 804) {
      return ("wi-day-Clouds")
    }
  };
  const tampil = !!loading ? null : (
    <div className="container row">
      <div className="judul">
        <h1 className="kota">{data.kota}</h1>
        <i className={`wi ${icon()} display-1`} />
        <h1 className="temperatur">{data.temperature}&deg;</h1>
        <h3>
          min: {data.temp_min}&deg; &nbsp; &nbsp; max: {data.temp_max}&deg;
        </h3>
        <p className="deskripsi">{data.description}</p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div>
        <Input onSubmit={submit} />
        {tampil}
      </div>
    </div>
  );
};

export default Weather;
