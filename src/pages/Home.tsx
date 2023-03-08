
import '../App.css'
import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';
import { useTrafficImages } from '../hooks/useTrafficImages';
import React, { useState, useEffect } from 'react';

export function Home() {

    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();


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


    const images = useTrafficImages(date, time);

  return (  
    <div className="App">
      <DatePicker handleChange={handleDateChange}/>
      <TimePicker handleChange={handleTimeChange}/>

    </div>
  );
}
