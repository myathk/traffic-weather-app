
import '../App.css';

interface IImage {
    url: string;
}



export const Image = (props: IImage) => {

    return(
        <img className="img" src={props.url} alt="">
        </img>

    )
}


