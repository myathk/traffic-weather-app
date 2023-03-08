
interface IDatePicker {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function DatePicker(props: IDatePicker) {

    return(
        <input type="date" onChange={props.handleChange} />
    )
}
