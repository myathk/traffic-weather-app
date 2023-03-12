import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { ITrafficImagesResponse } from '../interfaces/ITrafficImages';
import { useEffect, useState } from 'react';

export const useTrafficImagesAPI = (date: Date | undefined, time: String | undefined) => {
  const [data, setData] = useState<ITrafficImagesResponse | undefined>();
  const dateTime = date && time ? date.toLocaleDateString('fr-CA') + 'T' + formatTime(time) : null;

  const callAPI = async () => {
    if (dateTime) {
      const { data } = await axios.get<ITrafficImagesResponse>(
        `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`,
      );
      return data;
    }
  };

  useEffect(() => {
    callAPI()
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
        setData(undefined);
      });
  }, [dateTime]);

  return data;
};
