export default function calculateTodoListStats(todoList) {
  const res = [];
  const ideaTodos = todoList.filter(todoItem => todoItem.category === 'idea');
  const thoughtTodos = todoList.filter(todoItem => todoItem.category === 'thought');
  const taskTodos = todoList.filter(todoItem => todoItem.category === 'task');
  if (taskTodos.length > 0) {
    res.push({
      category: 'task',
      categoryText: 'Task',
      active: taskTodos.filter(todo => !todo.isArchived).length,
      archivedAmount: taskTodos.filter(todo => todo.isArchived).length,
    });
  }
  if (thoughtTodos.length > 0) {
    res.push({
      category: 'thought',
      categoryText: 'Random thought',
      active: thoughtTodos.filter(todo => !todo.isArchived).length,
      archivedAmount: thoughtTodos.filter(todo => todo.isArchived).length,
    });
  }
  if (ideaTodos.length > 0) {
    res.push({
      category: 'idea',
      categoryText: 'Idea',
      active: ideaTodos.filter(todo => !todo.isArchived).length,
      archivedAmount: ideaTodos.filter(todo => todo.isArchived).length,
    });
  }
  return res;
}
