import React, { useState } from "react";
import Input from "../Input/Input";
import axios from "axios";

const Card = () => {
  const [data, setData] = useState({
    kota: "",
    description: "",
    temperature: "",
    wind: "",
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
        });
        console.log(response.data);
        setLoading(false);
      });
  };

  const tampil = !!loading ? null : (
    <div className="container row">
      <div className="header col">
        <h3>{data.kota}</h3>
        <p>{data.description}</p>
      </div>
      <div className="col">
        <h3>{data.temperature}&deg;</h3>
        <p>{data.wind}Kn</p>
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

export default Card;
