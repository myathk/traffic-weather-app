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
import { ITrafficCameraWithForecast } from '../interfaces/ITrafficCameraWithForecast';
import { getTrafficCameraWithForecast } from '../functions/getTrafficCameraWithForecast';
import { TrafficLocationListItem } from '../components/TrafficLocationListItem';
import { Weather } from '../components/Weather';
import { Image } from '../components/Image';
import { Container } from '@mui/system';
import { Button, Grid, makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { getNestedTCwF } from '../functions/getNestedTCwF';
import { TrafficLocationNestedList } from '../components/TrafficLocationNestedList';

export const Home = () => {
    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();
    const [selectedForecast, setSelectedForecast] = useState<IForecast | undefined>();
    const [selectedImage, setSelectedImage] = useState<string>("https://www.lta.gov.sg/content/dam/ltagov/img/general/logo.png");

    const trafficImages:ITrafficImagesResponse | undefined = useTrafficImagesAPI(date, time);
    const weatherForecasts:IWeatherForecastsResponse | undefined = useWeatherForecastAPI(date, time);

    const twc:ITrafficCameraWithForecast[] = getTrafficCameraWithForecast(
      getTrafficCameras(trafficImages),
      getAreas(weatherForecasts),
      getForecasts(weatherForecasts));

    const nestedTCwF:ITrafficCameraWithForecast[][] = getNestedTCwF(twc);

    const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setDate(new Date(event.target.value));
        setSelectedForecast(undefined);
        setSelectedImage("https://www.lta.gov.sg/content/dam/ltagov/img/general/logo.png");   
    }

    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setTime(event.target.value);        
        setSelectedForecast(undefined);
        setSelectedImage("https://www.lta.gov.sg/content/dam/ltagov/img/general/logo.png");   
    }

  return (

      <Grid direction={'column'} container alignItems={'center'} style={{backgroundColor: "#b3c6ff"}}>
    
          <Grid  justifyContent={'center'} style={{background: "black"}} sx={{borderRadius:'30px', border: 'solid black 10px', margin:'15px'}} >
            <DatePicker handleChange={handleDateChange}/>
            <TimePicker handleChange={handleTimeChange}/>

          </Grid>

          <Grid display={'flex'} flexDirection={'row'}>
            <Grid style={{maxHeight:"80vh", overflow:'auto'}}>
              <List>
                {
                  nestedTCwF.length > 0 ?
                  nestedTCwF.map(item => <TrafficLocationNestedList tcwfs={item} key={item[0].forecast.area} setForecast={setSelectedForecast} setImage={setSelectedImage}/>)
                  : ""
                }
              </List>
              </Grid>

              <Grid>
              <Weather forecast={selectedForecast}/>
              <Image url={selectedImage}/>
              </Grid>

          </Grid>

          
      </Grid>

  );
}
