
import '../App.css'
import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';
import React, { useState } from 'react';
import { getTrafficCameras } from '../functions/getTrafficCameras';
import { ITrafficImagesResponse } from '../interfaces/ITrafficImages';
import { useTrafficImagesAPI } from '../hooks/useTrafficImagesAPI';
import { IForecast, IWeatherForecastsResponse } from '../interfaces/IWeatherForecasts';
import { useWeatherForecastAPI } from '../hooks/useWeatherForecastAPI';
import { getAreas } from '../functions/getAreas';
import { getForecasts } from '../functions/getForecasts';
import { ITrafficWeatherCamera } from '../interfaces/ITrafficWeatherCamera';
import { getTrafficWeatherCameras } from '../functions/getTrafficWeatherCameras';
import { TrafficLocationListItem } from '../components/TrafficLocationListItem';
import { Weather } from '../components/Weather';
import { Image } from '../components/Image';

export const Home = () => {
    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();
    const [selectedForecast, setSelectedForecast] = useState<IForecast | undefined>();
    const [selectedImage, setSelectedImage] = useState<string>("");

    const trafficImages:ITrafficImagesResponse | undefined = useTrafficImagesAPI(date, time);
    const weatherForecasts:IWeatherForecastsResponse | undefined = useWeatherForecastAPI(date, time);

    const twc:ITrafficWeatherCamera[] = getTrafficWeatherCameras(
      getTrafficCameras(trafficImages),
      getAreas(weatherForecasts),
      getForecasts(weatherForecasts));

    const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setDate(new Date(event.target.value));
        setSelectedForecast(undefined);
        setSelectedImage("");   
    }

    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setTime(event.target.value);        
        setSelectedForecast(undefined);
        setSelectedImage("");   
    }

  return (  
    <div className="App">
      <DatePicker handleChange={handleDateChange}/>
      <TimePicker handleChange={handleTimeChange}/>

      <br>
      </br>

      <Weather forecast={selectedForecast}/>
      <Image url={selectedImage}/>

      <ul>
        {
          twc.map(item => <TrafficLocationListItem trafficWeatherCamera={item} key={item.id} setForecast={setSelectedForecast} setImage={setSelectedImage}/>)
        }
      </ul>
    </div>
  );
}
