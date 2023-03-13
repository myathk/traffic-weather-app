import '../App.css';
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
import { Weather } from '../components/Weather';
import { Image } from '../components/Image';
import { Container } from '@mui/system';
import { Button, Grid, makeStyles } from '@mui/material';
import List from '@mui/material/List';
import { getNestedTCwF } from '../functions/getNestedTCwF';
import { TrafficLocationNestedList } from '../components/TrafficLocationNestedList';

export const Home = () => {
  const placeholderImage = process.env.REACT_APP_DEFAULT_TRAFFIC_IMAGE_URL;
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [openAreaList, setOpenAreaList] = useState<string | null>(null);
  const [selectedTcwf, setSelectedTcwf] = useState<ITrafficCameraWithForecast | undefined>();

  const trafficImages: ITrafficImagesResponse | undefined = useTrafficImagesAPI(date, time);
  const weatherForecasts: IWeatherForecastsResponse | undefined = useWeatherForecastAPI(date, time);

  const twc: ITrafficCameraWithForecast[] = getTrafficCameraWithForecast(
    getTrafficCameras(trafficImages),
    getAreas(weatherForecasts),
    getForecasts(weatherForecasts),
  );

  const nestedTCwF: ITrafficCameraWithForecast[][] = getNestedTCwF(twc);

  const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDate(new Date(event.target.value));
    setSelectedTcwf(undefined);
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTime(event.target.value);
    setSelectedTcwf(undefined);
  };

  return (
    <Container maxWidth='xl' style={{ maxHeight: '100vh' }}>
      <Grid
        direction={'column'}
        container
        alignItems={'center'}
        style={{ backgroundColor: '#e6f9ff' }}
      >
        <Grid
          justifyContent={'center'}
          style={{ background: 'black' }}
          sx={{ borderRadius: '30px', border: 'solid black 10px', margin: '15px' }}
        >
          <DatePicker handleChange={handleDateChange} />
          <TimePicker handleChange={handleTimeChange} />
        </Grid>

        <Grid display={'flex'} flexDirection={'row'}>
          {nestedTCwF.length > 0 ? (
            <Grid
              sx={{
                borderRadius: '30px',
                border: 'solid black 10px',
                margin: '15px',
                overflow: 'hidden',
              }}
            >
              <List
                sx={{
                  maxHeight: '85vh',
                  overflow: 'auto',
                }}
              >
                {nestedTCwF.map((item) => (
                  <TrafficLocationNestedList
                    tcwfs={item}
                    key={item[0].forecast.area}
                    selectedTcwf={selectedTcwf}
                    setSelectedTcwf={setSelectedTcwf}
                    openAreaList={openAreaList}
                    setOpenAreaList={setOpenAreaList}
                  />
                ))}
              </List>
            </Grid>
          ) : (
            ''
          )}

          <Grid>
            {nestedTCwF.length > 0 ? <Weather forecast={selectedTcwf?.forecast} /> : ''}

            <Image
              url={
                selectedTcwf
                  ? selectedTcwf.trafficCamera.image
                  : placeholderImage
                  ? placeholderImage
                  : ''
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
