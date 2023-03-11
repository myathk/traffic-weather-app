import { Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ITrafficLocation } from "../interfaces/ITrafficImages";
import { ITrafficCameraWithForecast } from "../interfaces/ITrafficCameraWithForecast"
import { IForecast } from "../interfaces/IWeatherForecasts";
import { TrafficLocationListItem } from "./TrafficLocationListItem";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface ITrafficLocationNestedList {
    tcwfs: ITrafficCameraWithForecast[];
    setImage: React.Dispatch<React.SetStateAction<string>>;
    setForecast: React.Dispatch<React.SetStateAction<IForecast | undefined>>;
}


export const TrafficLocationNestedList = (props: ITrafficLocationNestedList) => {
    const [open, setOpen] = useState(false);
    const tcwfs: ITrafficCameraWithForecast[] = props.tcwfs;

    return(

        tcwfs.length === 1 ?
        <TrafficLocationListItem trafficWeatherCamera={tcwfs[0]} key={tcwfs[0].id} setForecast={props.setForecast} setImage={props.setImage}></TrafficLocationListItem>
        :
        <>
        <List>
            <ListItem divider>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemText primary={tcwfs[0].forecast.area}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
        </List>

        <Collapse in={open}>
        <List>
        {
            tcwfs.map(item => <TrafficLocationListItem trafficWeatherCamera={item} key={item.id} setForecast={props.setForecast} setImage={props.setImage}/>)
        }
        </List>
        </Collapse>
       </>
    )
}
