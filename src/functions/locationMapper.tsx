import { ITrafficImagesResponse, ITrafficItems, ITrafficCamera } from "../interfaces/ITrafficImages";

export const locationMapper:Function = (data: ITrafficImagesResponse) => {

    const items: ITrafficItems[] = data.items;
    const cameras: ITrafficCamera[] = items[0].cameras;

    const filteredLocations = cameras.map((camera: ITrafficCamera) => camera.location);

    return filteredLocations;
}