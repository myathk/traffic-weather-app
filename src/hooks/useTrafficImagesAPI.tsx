import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { ITrafficImagesResponse } from '../interfaces/ITrafficImages';
import { useEffect, useState } from 'react';

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
