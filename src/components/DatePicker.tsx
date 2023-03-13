import '../App.css';

interface IDatePicker {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const DatePicker = (props: IDatePicker) => {
  return (
    <input
      className='date-picker'
      type='date'
      onChange={props.handleChange}
      max={new Date().toISOString().split('T')[0]}
    />
  );
};
