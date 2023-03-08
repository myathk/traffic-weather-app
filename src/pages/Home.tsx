
import '../App.css'
import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';

export function Home () {
  return (
    <div className="App">
      <DatePicker/>
      <TimePicker/>
    </div>
  );
}
