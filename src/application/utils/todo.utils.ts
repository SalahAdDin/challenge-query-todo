import { Todo, TodoStatus } from "@domain/todo.model";

const statusOrder: Record<TodoStatus, number> = {
  overdue: 1,
  going: 2,
  completed: 3,
};

const compareByStatus = (a: Todo, b: Todo): number => statusOrder[a.status] - statusOrder[b.status];

export default { statusOrder, compareByStatus };
