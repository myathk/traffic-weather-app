import { ITrafficCameraWithForecast } from '../interfaces/ITrafficCameraWithForecast';

/**
 * combines each tcwf with the same city area
 *
 * @param tcwfs array of traffic camera info with traffic images including corresponding weather
 * @returns a nested array of tcwfs, which each corresponds to one different city area as defined in weather API response
 */
export const getNestedTCwF = (
  tcwfs: ITrafficCameraWithForecast[],
): ITrafficCameraWithForecast[][] | [] => {
  if (tcwfs.length === 0) {
    return [];
  }

  var previousArea: string = tcwfs[0].forecast.area;
  var nestedTCwF: ITrafficCameraWithForecast[][] = [[]];

  for (let i = 0; i < tcwfs.length; i++) {
    const currTCwF = tcwfs[i];
    if (previousArea === currTCwF.forecast.area) {
      nestedTCwF[nestedTCwF.length - 1].push(currTCwF);
    } else {
      nestedTCwF.push([currTCwF]);
      previousArea = currTCwF.forecast.area;
    }
  }

  return nestedTCwF;
};
