import './weather.scss';

import clear_icon from '../../assets/clear.png';
import cloud_icon from '../../assets/cloud.png';
import drizzle_icon from '../../assets/drizzle.png';
import rain_icon from '../../assets/rain.png';
import snow_icon from '../../assets/snow.png';
import { useState } from 'react';

import { CiSearch } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

const Weather = () => {
  const [icon, setIcon] = useState(cloud_icon);
  let api_key = "79f7b3e86217de25ec608d66b2cb9eaa";

  const search = async() => {
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value === ""){
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let responce = await fetch(url);
    let data = await responce.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("temp");
    const location = document.getElementsByClassName("location");

    humidity[0].innerHTML = data.main.humidity;
    wind[0].innerHTML = data.wind.speed;
    temprature[0].innerHTML = data.main.temp;
    location[0].innerHTML = data.name;

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
      setIcon(clear_icon);
    }else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
      setIcon(cloud_icon);
    }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
      setIcon(drizzle_icon);
    }else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
      setIcon(drizzle_icon);
    }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
      setIcon(rain_icon);
    }else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
      setIcon(rain_icon);
    }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
      setIcon(snow_icon);
    }else{
      setIcon(clear_icon);
    }
  };
  
  return (
    <div className='weatherContainer'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search'></input>
        <div className="search-icon" onClick={() => {search()}}>
          <CiSearch></CiSearch>
        </div>
      </div>

      <div className='center'>
        <div className='left'>
          <div className="image">
            <img src={icon} alt="weather-icon"></img>
          </div>
        </div>
        
        <div className='right'>
          <div className="temp">24</div>

          <div className="location">London</div>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <WiHumidity className='icon'></WiHumidity>

          <div className="data">
            <div className="humidity-percent">64</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <FaWind className='icon'></FaWind>

          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather