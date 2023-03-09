import { ITrafficLocation } from "./ITrafficImages";

export interface IWeatherForecastsResponse {
  api_info: {
    status: "healthy";
  }
  area_metadata: IArea[];
  items: ITimestampedForecast[];
};

export interface IArea {
  name: string;
  label_location: ITrafficLocation
};

export interface ITimestampedForecast {
  update_timestamp: string;
  timestamp: number;
  valid_period: {
    start: string;
    end: string;
  }
  forecasts: IForecast[];
}

export interface IForecast {
  area: string;
  forecast: string;
}
