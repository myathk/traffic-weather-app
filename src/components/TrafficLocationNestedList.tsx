import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ITrafficCameraWithForecast } from '../interfaces/ITrafficCameraWithForecast';
import { IForecast } from '../interfaces/IWeatherForecasts';
import { TrafficListItem } from './TrafficListItem';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getRoadName } from '../API/getRoadName';

interface ITrafficLocationNestedList {
  tcwfs: ITrafficCameraWithForecast[];
  selectedTcwf: ITrafficCameraWithForecast | undefined;
  setSelectedTcwf: React.Dispatch<React.SetStateAction<ITrafficCameraWithForecast | undefined>>;
  openAreaList: string | null;
  setOpenAreaList: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TrafficLocationNestedList = (props: ITrafficLocationNestedList) => {
  const [mapOfRoads, setMapOfRoads] = useState(new Map());

  const tcwfs: ITrafficCameraWithForecast[] = props.tcwfs;
  const tcwf = tcwfs[0];
  const currOpen = props.openAreaList;

  const updateRoads = async () => {
    let promises: Promise<string>[] = [];

    if (currOpen === tcwf.forecast.area) {
      props.setOpenAreaList(null);
    } else {
      tcwfs.forEach(async (tcwf) => {
        const roadPromise = getRoadName(tcwf.trafficCamera.location);
        promises.push(roadPromise);
      });

      const roads = await Promise.all(promises);
      let newMapOfRoads = new Map();

      for (let i = 0; i < tcwfs.length; i++) {
        const tcwf = tcwfs[i];
        const key: string = `${tcwf.trafficCamera.location.latitude},${tcwf.trafficCamera.location.longitude}`;
        newMapOfRoads.set(key, roads[i]);
      }
      setMapOfRoads(newMapOfRoads);
    }
  };

  const handleClick = async () => {
    if (props.openAreaList === tcwfs[0].forecast.area) {
      props.setOpenAreaList(null);
    } else {
      if (mapOfRoads.size === 0) {
        try {
          await updateRoads();
        } catch (err) {
          console.log('Error in getRoadName API: ', err);
          setMapOfRoads(new Map());
        }
      }
      props.setOpenAreaList(tcwf.forecast.area);
    }
  };

  const handleTrafficLocationClick = (tcwf: ITrafficCameraWithForecast) => {
    props.setSelectedTcwf(tcwf);
  };

  return (
    <>
      <List>
        <ListItem divider>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={tcwfs[0].forecast.area + ' Area'} />
            {currOpen === tcwf.forecast.area ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={currOpen === tcwf.forecast.area}>
        <List>
          {tcwfs.map((tcwf) => (
            <TrafficListItem
              key={tcwf.id}
              selected={props.selectedTcwf?.id === tcwf.id}
              primaryText={tcwf.forecast.area}
              secondaryText={mapOfRoads.get(
                `${tcwf.trafficCamera.location.latitude},${tcwf.trafficCamera.location.longitude}`,
              )}
              handleClick={() => handleTrafficLocationClick(tcwf)}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
