import { refs } from '../index';
import calculateTodoListStats from './calculateStatistics';
import todoCategoryTemp from '../template/todoCategoryItem.hbs';
import todoItemTemp from '../template/todoItem.hbs';
import { todoList } from '../index';

export default function renderTodoItems(showArchived) {
  const markupTodoItems = todoList
    .filter(todo => todo.isArchived === showArchived)
    .map(todoItemTemp)
    .join('');
  refs.todoList.innerHTML = markupTodoItems;
  const markupTodoCategories = calculateTodoListStats(todoList).map(todoCategoryTemp).join('');
  refs.todoCategories.innerHTML = markupTodoCategories;
}
