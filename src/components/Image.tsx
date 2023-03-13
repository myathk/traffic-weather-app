import '../App.css';

interface IImage {
  url: string;
  styling: string;
}

export const Image = (props: IImage) => {
  return (
    <div>
      <img className={props.styling} src={props.url} alt=''></img>
    </div>
  );
};
