import '../App.css';
import { IForecast } from '../interfaces/IWeatherForecasts';
import { IconContext } from 'react-icons';
import {
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherDownpour,
} from 'react-icons/ti';

interface IWeather {
  forecast: IForecast | undefined;
}

interface IWeatherDisplay {
  forecast: string;
}

const WeatherDisplay = (props: IWeatherDisplay) => {
  const forecast = props.forecast;

  switch (true) {
    case forecast.includes('Sunny'):
      return <TiWeatherSunny />;
    case forecast.includes('Fair'):
      return <TiWeatherPartlySunny />;
    case forecast.includes('Cloudy'):
      return <TiWeatherCloudy />;
    case forecast.includes('Showers'):
      return <TiWeatherShower />;
    case forecast.includes('Rain'):
      return <TiWeatherDownpour />;
    default:
      return <TiWeatherCloudy />;
  }
};

export const Weather = (props: IWeather) => {
  return props.forecast ? (
    <div className='weather'>
      <IconContext.Provider value={{ size: '150px' }}>
        <WeatherDisplay forecast={props.forecast.forecast} />
      </IconContext.Provider>
      <h1>{props.forecast?.forecast}</h1>
    </div>
  ) : (
    <img
      className='weather-img'
      src='https://www.openinnovationnetwork.gov.sg/images/default-source/default-album/organisation/network/nea_logo.jpg?sfvrsn=f618ece4_3'
      alt=''
    ></img>
  );
};
