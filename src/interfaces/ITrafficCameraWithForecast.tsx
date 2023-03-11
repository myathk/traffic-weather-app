import { ITrafficCamera } from './ITrafficImages';
import { IForecast } from './IWeatherForecasts';

export interface ITrafficCameraWithForecast {
  trafficCamera: ITrafficCamera;
  forecast: IForecast;
  id: number;
}
