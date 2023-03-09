import { ITrafficImagesResponse, ITrafficItems, ITrafficCamera } from "../interfaces/ITrafficImages";

export const getTrafficCameras = (data: ITrafficImagesResponse | undefined):ITrafficCamera[] | [] => {

    if (data) {
        const items: ITrafficItems[] = data.items;
        const cameras: ITrafficCamera[] = items[0].cameras;
        if (cameras === undefined) {
            return [];
        }
        return cameras;
    } else {
        return [];
    }
}