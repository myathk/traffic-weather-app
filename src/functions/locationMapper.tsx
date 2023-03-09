import { ITrafficImagesResponse, ITrafficItems, ITrafficCamera, ITrafficLocation } from "../interfaces/ITrafficImages";

export const locationMapper = (data: ITrafficImagesResponse | undefined):ITrafficLocation[] | [] => {

    if (data) {
        const items: ITrafficItems[] = data.items;
        const cameras: ITrafficCamera[] = items[0].cameras;
        if (cameras == undefined) {
            return [];
        }

        const filteredLocations = cameras.map((camera: ITrafficCamera) => camera.location);
        
        console.log(filteredLocations);
        return filteredLocations;
    } else {
        return [];
    }
}