
import '../App.css'
import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';
import React, { useState, useEffect } from 'react';
import { TrafficImagesAPI } from '../api/TrafficImagesAPI';
import { locationMapper } from '../functions/locationMapper';
import { ITrafficCamera } from '../interfaces/ITrafficImages';

export const Home = () => {

    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();
    const [locations, setLocations] = useState<ITrafficCamera[] | undefined>();

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

    useEffect(() => {
        setLocations(TrafficImagesAPI(date, time, locationMapper));
        console.log(locations);
    }, [date, time])

  return (  
    <div className="App">
      <DatePicker handleChange={handleDateChange}/>
      <TimePicker handleChange={handleTimeChange}/>

    </div>
  );
}
