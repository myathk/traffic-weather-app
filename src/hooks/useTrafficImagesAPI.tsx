import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { ITrafficImagesResponse } from '../interfaces/ITrafficImages';
import { useEffect, useState } from 'react';

/**
 * traffic API used to get data that contains an array of info from available traffic cameras
 * which includes location in lat long and image url
 *
 * @param date Date set from date picker
 * @param time time in string set from date picker in HH:mm format
 * @returns data from traffic API
 */
export const useTrafficImagesAPI = (date: Date | undefined, time: String | undefined) => {
  const [data, setData] = useState<ITrafficImagesResponse | undefined>();
  const dateTime = date && time ? date.toLocaleDateString('fr-CA') + 'T' + formatTime(time) : null;

  useEffect(() => {
    const callAPI = async () => {
      if (dateTime) {
        const { data } = await axios.get<ITrafficImagesResponse>(
          `${process.env.REACT_APP_TRAFFIC_IMAGES_URL}${dateTime}`,
        );
        return data;
      }
    };

    callAPI()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log('Error from useTrafficImagesAPI: ', err);
        setData(undefined);
      });
  }, [dateTime]);

  return data;
};
