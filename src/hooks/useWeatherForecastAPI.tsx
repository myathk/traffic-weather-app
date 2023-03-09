import axios from 'axios';
import { formatTime } from '../utils/formatTime';
import { useEffect, useState } from 'react';
import { IWeatherForecastsResponse } from '../interfaces/IWeatherForecasts';

export const useWeatherForecastAPI = (date: Date | undefined, time: String | undefined) => {
    const [ data, setData ] = useState<IWeatherForecastsResponse| undefined>();
    const dateTime = (date && time) ? date.toLocaleDateString('fr-CA') + "T" + formatTime(time) : null;

    const callAPI = async () => {
        if (dateTime) {
            const { data } = await axios.get<IWeatherForecastsResponse>(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateTime}`);
            
            return data;
        }
  }

  useEffect(() =>{
    callAPI().then(data => setData(data))
            .catch(err => { 
              console.log(err);
              setData(undefined);
            })
  }, [dateTime])

  return data;
}