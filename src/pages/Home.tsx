
import '../App.css'
import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';
import React, { useState } from 'react';
import { getTrafficCameras } from '../functions/getTrafficCameras';
import { ITrafficCamera, ITrafficImagesResponse } from '../interfaces/ITrafficImages';
import { useTrafficImagesAPI } from '../hooks/useTrafficImagesAPI';
import { IArea, IForecast, IWeatherForecastsResponse } from '../interfaces/IWeatherForecasts';
import { useWeatherForecastAPI } from '../hooks/useWeatherForecastAPI';
import { getAreas } from '../functions/getAreas';
import { getForecasts } from '../functions/getForecasts';

export const Home = () => {
    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();
    const trafficImages:ITrafficImagesResponse | undefined = useTrafficImagesAPI(date, time);
    const weatherForecasts:IWeatherForecastsResponse | undefined = useWeatherForecastAPI(date, time);

    const areas:IArea[] = getAreas(weatherForecasts);
    const trafficCameras:ITrafficCamera[] = getTrafficCameras(trafficImages);
    const forecasts:IForecast[] = getForecasts(weatherForecasts);

    const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setDate(new Date(event.target.value));   
    }

    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setTime(event.target.value);   
    }

  return (  
    <div className="App">
      <DatePicker handleChange={handleDateChange}/>
      <TimePicker handleChange={handleTimeChange}/>

    </div>
  );
}
