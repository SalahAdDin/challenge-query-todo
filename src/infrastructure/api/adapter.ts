import { BETodo, Todo } from "@domain/todo.model";

const adaptTodo = (input: BETodo): Todo => ({
  ...input,
  dueDate: new Date(input.dueDate),
});

export default { adaptTodo };
