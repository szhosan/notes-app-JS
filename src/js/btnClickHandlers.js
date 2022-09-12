import { editItem, changeArchiveStatus, deleteItem } from './toDoItemsFuncs';
import renderTodoItems from '../js/render';
import { todoList } from '..';

export let showArchivedTodoItems = false;

export function onTodoListClick(e) {
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

export function OnArchiveBtnClick() {
  showArchivedTodoItems = !showArchivedTodoItems;
  renderTodoItems(showArchivedTodoItems);
  document.querySelector('#head').classList.toggle('todos_header_archive');
}

export function onDeleteAllClick() {
  if (window.confirm('Do you really want to delete all todo items???')) {
    todoList.splice(0, todoList.length);
  }
  renderTodoItems(showArchivedTodoItems);
}
