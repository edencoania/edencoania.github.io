import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


export function DateTimePicker(props) {

  const handleDateChange = (date) => {
    props.setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={props.selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
}