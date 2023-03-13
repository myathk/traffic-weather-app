import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { useEffect, useState } from 'react';
import { IWeatherForecastsResponse } from '../interfaces/IWeatherForecasts';

/**
 * weather API used to get weather information for specific nearest location
 *
 * @param date Date set from date picker
 * @param time time in string set from date picker in HH:mm format
 * @returns data from weather API
 */
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
