import { ITrafficCamera, ITrafficLocation } from "../interfaces/ITrafficImages";
import { ITrafficWeatherCamera } from "../interfaces/ITrafficWeatherCamera";
import { IArea, IForecast } from "../interfaces/IWeatherForecasts";
import { getDistance } from "../utils/getDistance";

const getNearestForecast = (targetLocation:ITrafficLocation, areas:IArea[], forecasts: IForecast[]):IForecast => {

    const correspondingArea = areas.reduce((previousArea, currentArea) => {
        const prevLocation:ITrafficLocation = previousArea.label_location;
        const currLocation:ITrafficLocation = currentArea.label_location;

        const prevDistance:number = getDistance(targetLocation.latitude, targetLocation.longitude, prevLocation.latitude, prevLocation.longitude);
        const currDistance:number = getDistance(targetLocation.latitude, targetLocation.longitude, currLocation.latitude, currLocation.longitude);

        if (currDistance <= prevDistance) {
            return currentArea;
        } else {
            return previousArea
        }
    }, areas[0])

    const nearestForecast:IForecast[] = forecasts.filter((forecast:IForecast) => forecast.area === correspondingArea.name);

    if (nearestForecast.length === 0) {
        return forecasts[0];
    }

    return nearestForecast[0];
}

export const getTrafficWeatherCameras = (trafficCameras: ITrafficCamera[], areas:IArea[], forecasts: IForecast[]):ITrafficWeatherCamera[] | [] => {

    if (areas.length === 0 || trafficCameras.length === 0 || forecasts.length === 0) {
        return [];
    }
 
    const trafficWeatherCameras:ITrafficWeatherCamera[] = trafficCameras.map(
        (trafficCamera:ITrafficCamera) => {

            const location:ITrafficLocation = trafficCamera.location;
            const forecast:IForecast = getNearestForecast(location, areas, forecasts);

            return { 
                trafficCamera: trafficCamera,
                forecast: forecast,
                id: trafficCamera.camera_id
            }
        }
    );
    
    const sortedTrafficWeatherCameras:ITrafficWeatherCamera[] = trafficWeatherCameras.sort((twc1:ITrafficWeatherCamera, twc2:ITrafficWeatherCamera) => {
        return twc1.forecast.area < twc2.forecast.area ? -1 : twc1.forecast.area > twc2.forecast.area ? 1 : 0;
    });

    return sortedTrafficWeatherCameras;
}