import React, {useState} from 'react';


export function DatePicker() {

    const [date, setDate] = useState<Date | null>();

    console.log("date", date);

    return(
        <input type="date" onChange={e=>setDate(new Date(e.target.value))} />
    )

}

