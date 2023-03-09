import { ITrafficCamera } from "./ITrafficImages";
import { IForecast } from "./IWeatherForecasts";

export interface ITrafficWeatherCamera {
  trafficCamera: ITrafficCamera;
  forecast: IForecast;
}