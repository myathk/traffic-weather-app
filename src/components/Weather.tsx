import '../App.css'
import { IForecast } from "../interfaces/IWeatherForecasts";
import { IconContext } from "react-icons";
import { TiWeatherCloudy, TiWeatherShower, TiWeatherSunny, TiWeatherPartlySunny, TiWeatherDownpour } from 'react-icons/ti'

interface IWeather {
    forecast: IForecast | undefined;
}

interface IWeatherDisplay {
    forecast: string;
}


const WeatherDisplay = (props:IWeatherDisplay) => {
    const forecast = props.forecast

    switch (true) {
        case (forecast.includes("Sunny")):
            return <TiWeatherSunny/>
        case (forecast.includes("Fair")):
            return <TiWeatherPartlySunny/>
        case (forecast.includes("Cloudy")):
            return <TiWeatherCloudy />
        case (forecast.includes("Showers")):
            return <TiWeatherShower/>
        case (forecast.includes("Rain")):
            return <TiWeatherDownpour/>
        default:
            return <TiWeatherCloudy />
    }
}

export const Weather = (props: IWeather) => {

    return(
        <div className="weather">
            <IconContext.Provider value={{size: "300px"}}>
            { props.forecast ? <WeatherDisplay forecast={props.forecast.forecast}/>: undefined}
            </IconContext.Provider>
            <h1>
                {props.forecast?.forecast}
            </h1>
        </div>
    )
}
