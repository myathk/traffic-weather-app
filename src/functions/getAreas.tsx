import { IArea, IWeatherForecastsResponse } from '../interfaces/IWeatherForecasts';

export const getAreas = (data: IWeatherForecastsResponse | undefined): IArea[] | [] => {
  if (data) {
    const areas: IArea[] = data.area_metadata;
    return areas;
  } else {
    return [];
  }
};
