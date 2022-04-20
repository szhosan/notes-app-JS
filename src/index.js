import './sass/main.scss';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;

const refs = {
  form: document.querySelector('.modal_form'),
  modal: document.querySelector('[data-modal]'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
};

const options = {
  defaultDate: new Date(),
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

refs.form.addEventListener('submit', OnFormSubmit);

function OnFormSubmit(e) {
  e.preventDefault();
  console.log(`name ${e.currentTarget.elements.name.value}`);
  console.log(`category ${e.currentTarget.elements.category.value}`);
  console.log(`content ${e.currentTarget.elements.content.value}`);
  console.log(`deadline ${e.currentTarget.elements.deadline.value}`);
}
