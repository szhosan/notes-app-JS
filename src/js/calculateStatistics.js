export default function calculateTodoListStats(todoList) {
  let res = [];
  const categories = [...new Set(todoList.map(todoItem => todoItem.category))];
  res = categories.map(category => {
    let categoryText = '';
    switch (category) {
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
    return {
      category: category,
      categoryText: categoryText,
      active: todoList.filter(todoItem => todoItem.category === category && !todoItem.isArchived)
        .length,
      archivedAmount: todoList.filter(
        todoItem => todoItem.category === category && todoItem.isArchived,
      ).length,
    };
  });
  return res;
}
