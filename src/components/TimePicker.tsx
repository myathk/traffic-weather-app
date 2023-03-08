
interface ITimePicker {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TimePicker = (props: ITimePicker) => {

    return(
        <input type="time" onChange={props.handleChange} />
    )
}
