
interface ITimePicker {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function TimePicker(props: ITimePicker) {

    return(
        <input type="time" onChange={props.handleChange} />
    )
}
