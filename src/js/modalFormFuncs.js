import { refs } from '../index';
import renderTodoItems from './render';
import { todoList } from '../index';
import uniqid from 'uniqid';
import flatpickr from 'flatpickr';
import capitalize from './capitalize';
import { showArchivedTodoItems } from './btnClickHandlers';
import { updateTodoItem } from './toDoItemsFuncs';

export function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

export function OnModalClose() {
  toggleModal();
  delete refs.form.dataset.id;
  refs.form.reset();
  refs.form.elements.submitBtn.innerHTML = 'Create note';
}

export function OnFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget.elements;
  const elementIdToEdit = refs.form.dataset.id;
  const id = uniqid();
  const today = flatpickr.formatDate(new Date(), 'F d, Y');
  const todoElement = {
    id: id,
    name: form.name.value,
    category: form.category.value,
    categoryText: capitalize(form.category.value),
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
