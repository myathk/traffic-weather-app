import { IForecast } from "../interfaces/IWeatherForecasts";

interface IWeather {
    forecast: IForecast | undefined;
}

export const Weather = (props: IWeather) => {

    return(
        <h1>
            {props.forecast?.forecast}
        </h1>
    )
}
