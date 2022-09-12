import { todoList } from '../index';
import { refs } from '../index';
import { toggleModal } from './modalFormFuncs';

export function deleteItem(id) {
  todoList.splice(
    todoList.findIndex(todoItem => todoItem.id === id),
    1,
  );
}

export function editItem(id) {
  const todoItemForEdit = todoList.find(todoItem => todoItem.id === id);
  setItemsForEditToModal(todoItemForEdit);
  toggleModal();
}

export function updateTodoItem(id, { name, category, categoryText, content, dates }) {
  const i = todoList.findIndex(todoItem => todoItem.id === id);
  todoList[i].name = name;
  todoList[i].category = category;
  todoList[i].categoryText = categoryText;
  todoList[i].content = content;
  todoList[i].dates = dates;
}

export function setItemsForEditToModal({ id, name, category, created, content }) {
  const form = refs.form.elements;
  refs.form.dataset.id = id;
  form.title.value = `Edit note from ${created}`;
  form.name.value = name;
  form.category.value = category;
  form.content.value = content;
  form.submitBtn.innerHTML = 'Save changes';
}

export function changeArchiveStatus(id) {
  const todoItemIndex = todoList.findIndex(todoItem => todoItem.id === id);
  todoList[todoItemIndex].isArchived = !todoList[todoItemIndex].isArchived;
}
