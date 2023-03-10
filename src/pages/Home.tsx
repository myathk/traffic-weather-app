
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
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';




export const Home = () => {
    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<String | undefined>();
    const [selectedForecast, setSelectedForecast] = useState<IForecast | undefined>();
    const [selectedImage, setSelectedImage] = useState<string>("https://www.lta.gov.sg/content/dam/ltagov/img/general/logo.png");

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
      <Container maxWidth="lg" style={{backgroundColor: "#b3c6ff"}}>
    
          <Box>
            <DatePicker handleChange={handleDateChange}/>
            <TimePicker handleChange={handleTimeChange}/>
            <Button>
              Click
            </Button>
          </Box>
            <br>
            </br>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
            <Box style={{maxHeight:"100vh", overflow:'auto'}}>
              <List>            <ul>
                {
                  twc.map(item => <TrafficLocationListItem trafficWeatherCamera={item} key={item.id} setForecast={setSelectedForecast} setImage={setSelectedImage}/>)
                }
              </ul>
              </List>
              </Box>
              <Box>
              <Weather forecast={selectedForecast}/>
              <Image url={selectedImage}/>
              </Box>
          </Box>
      </Container>
  );
}
