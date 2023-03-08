import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatTime } from '../utils/formatTime';

interface TrafficImagesResponse {
    api_info: {
        status: "healthy";
    }
    items: Items[];
}

interface Items {
    timestamp: String;
    cameras: Camera[];
}

interface Camera {
    timestamp: String;
    camera_id: number;
    image_id: number;
    image: string;
    image_metadata: {
        height: number;
        width: number;
        md5: string;
    }
}

export function useTrafficImages(date: Date | undefined, time: String | undefined) {
    const [locations, setLocations] = useState([]);

    const dateTime = (date && time) ? date.toLocaleDateString('fr-CA') + "T" + formatTime(time) : null;

    useEffect(() => {
        const fetchTrafficImages = async () => {
            try {
                if (dateTime) {
                    const response = await axios.get(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`);
                    
                    const data: TrafficImagesResponse = response.data;
                    console.log(data.items);

                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchTrafficImages();
    }, [dateTime]);

    return { locations };
}