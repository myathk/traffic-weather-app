
interface IDatePicker {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const DatePicker = (props: IDatePicker) => {

    return(
        <input type="date" onChange={props.handleChange} />
    )
}
