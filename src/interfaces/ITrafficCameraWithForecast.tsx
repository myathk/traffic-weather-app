import { ITrafficCamera } from './ITrafficImages';
import { IForecast } from './IWeatherForecasts';

/**
 * Interface for object that contains traffic image url, weather forecast and area
 */
export interface ITrafficCameraWithForecast {
  trafficCamera: ITrafficCamera;
  forecast: IForecast;
  id: number;
}
