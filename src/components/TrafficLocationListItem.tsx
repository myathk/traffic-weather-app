import { ITrafficLocation } from "../interfaces/ITrafficImages";
import { ITrafficWeatherCamera } from "../interfaces/ITrafficWeatherCamera"
import { IForecast } from "../interfaces/IWeatherForecasts";

interface ITrafficLocationListItem {
    trafficWeatherCamera: ITrafficWeatherCamera;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    setForecast: React.Dispatch<React.SetStateAction<IForecast | undefined>>;
}

export const TrafficLocationListItem = (props: ITrafficLocationListItem) => {

    const trafficWeatherCamera: ITrafficWeatherCamera = props.trafficWeatherCamera;
    const location: ITrafficLocation = trafficWeatherCamera?.trafficCamera?.location;
    const area:String = trafficWeatherCamera?.forecast?.area;

    const handleTrafficLocationOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
          props.setImage(trafficWeatherCamera?.trafficCamera?.image);
          props.setForecast(trafficWeatherCamera?.forecast);
    } 

    return(
        <li>
            <div onClick={handleTrafficLocationOnClick}>
                <h3>{location.latitude} {location.longitude} {area}</h3>
            </div>
        </li>
    )
}
