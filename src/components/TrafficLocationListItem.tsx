import { ListItemButton, ListItemText } from '@mui/material';
import { ITrafficLocation } from '../interfaces/ITrafficImages';
import { ITrafficCameraWithForecast } from '../interfaces/ITrafficCameraWithForecast';
import { IForecast } from '../interfaces/IWeatherForecasts';
import { getRoadName } from '../API/getRoadName';
import { useState } from 'react';

interface ITrafficLocationListItem {
  trafficWeatherCamera: ITrafficCameraWithForecast;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setForecast: React.Dispatch<React.SetStateAction<IForecast | undefined>>;
  road: string | null;
}

export const TrafficLocationListItem = (props: ITrafficLocationListItem) => {
  const trafficWeatherCamera: ITrafficCameraWithForecast = props.trafficWeatherCamera;
  const area: string = trafficWeatherCamera?.forecast?.area;

  const handleTrafficLocationOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    props.setImage(trafficWeatherCamera?.trafficCamera?.image);
    props.setForecast(trafficWeatherCamera?.forecast);
  };

  return (
    <>
      <ListItemButton divider onClick={handleTrafficLocationOnClick}>
        <ListItemText
          primary={area}
          secondary={props.road && props.road !== 'NIL' ? props.road : 'Road name unavailable'}
        ></ListItemText>
      </ListItemButton>
    </>
  );
};
