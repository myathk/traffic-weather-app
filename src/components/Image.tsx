
interface IImage {
    url: string;
}

export const Image = (props: IImage) => {

    return(
        <img src={props.url} alt="">
        </img>
    )
}
