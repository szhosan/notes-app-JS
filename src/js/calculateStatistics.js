import capitalize from '../index';

export default function calculateTodoListStats(todoList) {
  let res = [];
  const categories = [...new Set(todoList.map(todoItem => todoItem.category))];
  res = categories.map(category => {
    return {
      category: category,
      categoryText: capitalize(category),
      active: todoList.filter(todoItem => todoItem.category === category && !todoItem.isArchived)
        .length,
      archivedAmount: todoList.filter(
        todoItem => todoItem.category === category && todoItem.isArchived,
      ).length,
    };
  });
  return res;
}
