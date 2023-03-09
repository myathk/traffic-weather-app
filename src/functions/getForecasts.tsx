import { IForecast, ITimestampedForecast, IWeatherForecastsResponse } from "../interfaces/IWeatherForecasts";

export const getForecasts = (data: IWeatherForecastsResponse | undefined):IForecast[] | [] => {

    if (data) {
        const timestampedForecasts: ITimestampedForecast[] = data.items;
        const forecasts: IForecast[] = timestampedForecasts[0].forecasts;
        if (forecasts === undefined) {
          return [];
        }
        return forecasts;
    } else {
        return [];
    }
}