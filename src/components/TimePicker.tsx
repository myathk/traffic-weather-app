import React, {useState} from 'react';


export function TimePicker() {

    const [date, setDate] = useState<String | null>();

    console.log("date", date);

    return(
        <input type="time" onChange={e=>setDate(e.target.value)} />
    )

}

