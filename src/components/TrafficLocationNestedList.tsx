import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ITrafficCameraWithForecast } from '../interfaces/ITrafficCameraWithForecast';
import { IForecast } from '../interfaces/IWeatherForecasts';
import { TrafficLocationListItem } from './TrafficLocationListItem';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getRoadName } from '../API/getRoadName';

interface ITrafficLocationNestedList {
  tcwfs: ITrafficCameraWithForecast[];
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setForecast: React.Dispatch<React.SetStateAction<IForecast | undefined>>;
  openAreaList: string | null;
  setOpenAreaList: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TrafficLocationNestedList = (props: ITrafficLocationNestedList) => {
  const [mapOfRoads, setMapOfRoads] = useState(new Map());

  const tcwfs: ITrafficCameraWithForecast[] = props.tcwfs;
  const tcwf = tcwfs[0];
  const currOpen = props.openAreaList;

  const updateRoads = async () => {
    var promises: Promise<string>[] = [];

    if (currOpen === tcwf.forecast.area) {
      props.setOpenAreaList(null);
    } else {
      tcwfs.forEach(async (tcwf) => {
        console.log('ran api');
        const roadPromise = getRoadName(tcwf.trafficCamera.location);
        promises.push(roadPromise);
      });

      const roads = await Promise.all(promises);
      var newMapOfRoads = new Map();

      for (var i = 0; i < tcwfs.length; i++) {
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
        await updateRoads();
      }
      props.setOpenAreaList(tcwf.forecast.area);
    }
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
            <TrafficLocationListItem
              trafficWeatherCamera={tcwf}
              key={tcwf.id}
              setForecast={props.setForecast}
              setImage={props.setImage}
              road={mapOfRoads.get(
                `${tcwf.trafficCamera.location.latitude},${tcwf.trafficCamera.location.longitude}`,
              )}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
