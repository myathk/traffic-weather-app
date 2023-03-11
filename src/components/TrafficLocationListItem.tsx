import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ITrafficLocation } from "../interfaces/ITrafficImages";
import { ITrafficCameraWithForecast } from "../interfaces/ITrafficCameraWithForecast"
import { IForecast } from "../interfaces/IWeatherForecasts";

interface ITrafficLocationListItem {
    trafficWeatherCamera: ITrafficCameraWithForecast;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    setForecast: React.Dispatch<React.SetStateAction<IForecast | undefined>>;
}

export const TrafficLocationListItem = (props: ITrafficLocationListItem) => {

    const trafficWeatherCamera: ITrafficCameraWithForecast = props.trafficWeatherCamera;
    const location: ITrafficLocation = trafficWeatherCamera?.trafficCamera?.location;
    const area:String = trafficWeatherCamera?.forecast?.area;

    const handleTrafficLocationOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
          props.setImage(trafficWeatherCamera?.trafficCamera?.image);
          props.setForecast(trafficWeatherCamera?.forecast);
    } 

    return(
        <>
       <ListItemButton divider onClick={handleTrafficLocationOnClick}>

        <ListItemText primary={area} secondary={location.latitude + " " + location.latitude}>

        </ListItemText>
       </ListItemButton>
       </>
    )
}
