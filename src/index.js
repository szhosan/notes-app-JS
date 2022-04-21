import './sass/main.scss';
import uniqid from 'uniqid';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import todoItemTemp from './template/todoItem.hbs';
import todoCategoryTemp from './template/todoCategoryItem.hbs';
import calculateTodoListStats from './js/calculateStatistics';
import items from './js/preItems.json';

const refs = {
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

let showArchivedTodoItems = false;
const todoList = [...items];
renderTodoItems(showArchivedTodoItems);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

function OnModalClose() {
  toggleModal();
  delete refs.form.dataset.id;
  refs.form.reset();
  refs.form.elements.submitBtn.innerHTML = 'Create note';
}

function OnFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget.elements;
  const elementIdToEdit = refs.form.dataset.id;
  const id = uniqid();
  const today = flatpickr.formatDate(new Date(), 'F d, Y');
  let categoryText = '';
  switch (form.category.value) {
    case 'idea':
      categoryText = 'Idea';
      break;
    case 'thought':
      categoryText = 'Random thought';
      break;
    case 'task':
      categoryText = 'Task';
      break;
  }
  const todoElement = {
    id: id,
    name: form.name.value,
    category: form.category.value,
    categoryText: categoryText,
    content: form.content.value,
    created: today,
    isArchived: false,
    dates: form.content.value
      .split(' ')
      .filter(str =>
        str.match(
          '^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$',
        ),
      ),
  };
  if (elementIdToEdit) {
    updateTodoItem(elementIdToEdit, todoElement);
  } else {
    todoList.push(todoElement);
  }
  e.currentTarget.reset();
  toggleModal();
  renderTodoItems(showArchivedTodoItems);
  delete refs.form.dataset.id;
  form.submitBtn.innerHTML = 'Create note';
}

function renderTodoItems(showArchived) {
  const markupTodoItems = todoList
    .filter(todo => todo.isArchived === showArchived)
    .map(todoItemTemp)
    .join('');
  refs.todoList.innerHTML = markupTodoItems;
  const markupTodoCategories = calculateTodoListStats(todoList).map(todoCategoryTemp).join('');
  refs.todoCategories.innerHTML = markupTodoCategories;
}

function changeArchiveStatus(id) {
  const todoItemIndex = todoList.findIndex(todoItem => todoItem.id === id);
  todoList[todoItemIndex].isArchived = !todoList[todoItemIndex].isArchived;
}

function deleteItem(id) {
  todoList.splice(
    todoList.findIndex(todoItem => todoItem.id === id),
    1,
  );
}

function editItem(id) {
  const todoItemForEdit = todoList.find(todoItem => todoItem.id === id);
  setItemsForEditToModal(todoItemForEdit);
  toggleModal();
}

function updateTodoItem(id, { name, category, categoryText, content, dates }) {
  const i = todoList.findIndex(todoItem => todoItem.id === id);
  todoList[i].name = name;
  todoList[i].category = category;
  todoList[i].categoryText = categoryText;
  todoList[i].content = content;
  todoList[i].dates = [...dates];
}

function setItemsForEditToModal({ id, name, category, created, content }) {
  const form = refs.form.elements;
  refs.form.dataset.id = id;
  form.title.value = `Edit note from ${created}`;
  form.name.value = name;
  form.category.value = category;
  form.content.value = content;
  form.submitBtn.innerHTML = 'Save changes';
}

function onTodoListClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const elementId = e.target.dataset.id;
  switch (e.target.dataset.operation) {
    case 'edit':
      editItem(elementId);
      break;
    case 'archive':
      changeArchiveStatus(elementId);
      break;
    case 'delete':
      deleteItem(elementId);
      break;
  }
  renderTodoItems(showArchivedTodoItems);
}

function OnArchiveBtnClick() {
  showArchivedTodoItems = !showArchivedTodoItems;
  renderTodoItems(showArchivedTodoItems);
  document.querySelector('#head').classList.toggle('todos_header_archive');
}

function onDeleteAllClick() {
  if (window.confirm('Do you really want to delete all todo items???')) {
    todoList.splice(0, todoList.length);
  }
  renderTodoItems(showArchivedTodoItems);
}
