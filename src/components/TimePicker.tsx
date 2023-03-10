
interface ITimePicker {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TimePicker = (props: ITimePicker) => {

    return(
        <input className="time-picker" type="time" onChange={props.handleChange} />
    )
}
