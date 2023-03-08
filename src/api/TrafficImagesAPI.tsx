import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { ITrafficImagesResponse } from '../interfaces/ITrafficImages';

export const TrafficImagesAPI:any = async (date: Date | undefined, time: String | undefined, mapper: Function) => {
    const dateTime = (date && time) ? date.toLocaleDateString('fr-CA') + "T" + formatTime(time) : null;

    try {
        if (dateTime) {
            const response = await axios.get(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`);
            
            const data: ITrafficImagesResponse = response.data;
            const newData = mapper(data);

            return newData
        }
    } catch (error) {
        console.log(error)
    };
}