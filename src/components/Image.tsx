import '../App.css';

interface IImage {
  url: string;
}

export const Image = (props: IImage) => {
  return (
    <div>
      <img className='img' src={props.url} alt='' loading='lazy'></img>;
    </div>
  );
};
