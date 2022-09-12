import './sass/main.scss';
import 'flatpickr/dist/flatpickr.min.css';
import items from './js/preItems.json';
import { toggleModal } from './js/modalFormFuncs';
import { OnModalClose } from './js/modalFormFuncs';
import { OnFormSubmit } from './js/modalFormFuncs';
import renderTodoItems from './js/render';
import { onTodoListClick, OnArchiveBtnClick, onDeleteAllClick } from './js/btnClickHandlers';

export const refs = {
  form: document.querySelector('.modal_form'),
  modal: document.querySelector('[data-modal]'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  todoList: document.querySelector('.todos_list'),
  todoCategories: document.querySelector('.categories_list'),
  archiveBtn: document.querySelector('#butt_archive'),
  deleteAllBtn: document.querySelector('#butt_delete_all'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', OnModalClose);
refs.todoList.addEventListener('click', onTodoListClick);
refs.archiveBtn.addEventListener('click', OnArchiveBtnClick);
refs.form.addEventListener('submit', OnFormSubmit);
refs.deleteAllBtn.addEventListener('click', onDeleteAllClick);

export const todoList = [...items];
renderTodoItems();
