import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const options = {
  defaultDate: new Date(),
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);
