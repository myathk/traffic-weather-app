
import '../App.css'
import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';
import React, { useState } from 'react';
import { locationMapper } from '../functions/locationMapper';
import { ITrafficCamera, ITrafficLocation, ITrafficImagesResponse } from '../interfaces/ITrafficImages';
import { useTrafficImagesAPI } from '../hooks/useTrafficImagesAPI';

export const Home = () => {

    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();
    const trafficImages:ITrafficImagesResponse | undefined = useTrafficImagesAPI(date, time);
    const [locations, setLocations] = useState<ITrafficLocation[]>(locationMapper(trafficImages));

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
