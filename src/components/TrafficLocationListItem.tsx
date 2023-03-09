import { ITrafficLocation } from "../interfaces/ITrafficImages";
import { ITrafficWeatherCamera } from "../interfaces/ITrafficWeatherCamera"

interface ITrafficLocationListItem {
    trafficWeatherCamera: ITrafficWeatherCamera;
    handleClick: React.MouseEventHandler<HTMLDivElement>;
}

export const TrafficLocationListItem = (props: ITrafficLocationListItem) => {

    const trafficWeatherCamera: ITrafficWeatherCamera = props.trafficWeatherCamera;
    const location: ITrafficLocation = trafficWeatherCamera?.trafficCamera?.location;
    const area:String = trafficWeatherCamera?.forecast?.area;

    return(
        <li>
            <div onClick={props.handleClick}>
                <h3>{location.latitude} {location.longitude} {area}</h3>
            </div>

        </li>
    )
}
