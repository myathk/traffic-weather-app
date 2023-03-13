import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { useEffect, useState } from 'react';
import { IWeatherForecastsResponse } from '../interfaces/IWeatherForecasts';

export const useWeatherForecastAPI = (date: Date | undefined, time: String | undefined) => {
  const [data, setData] = useState<IWeatherForecastsResponse | undefined>();
  const dateTime = date && time ? date.toLocaleDateString('fr-CA') + 'T' + formatTime(time) : null;

  useEffect(() => {
    const callAPI = async () => {
      if (dateTime) {
        const { data } = await axios.get<IWeatherForecastsResponse>(
          `${process.env.REACT_APP_WEATHER_URL}${dateTime}`,
        );
        return data;
      }
    };

    callAPI()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log('Error from useWeatherForecastAPI :', err);
        setData(undefined);
      });
  }, [dateTime]);

  return data;
};
