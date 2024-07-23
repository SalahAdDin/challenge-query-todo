import { BETodo, Todo } from "@domain/todo.model";

const adaptTodo = (input: BETodo): Todo => {
  const now = new Date();
  const dueDate = input.dueDate ? new Date(input.dueDate) : null;

  const calculateStatus = () => {
    if (input.isComplete) return "completed";
    if (dueDate && now > dueDate && !input.isComplete) return "overdue";
    return "going";
  };

  return {
    ...input,
    dueDate,
    status: calculateStatus(),
  };
};

export default { adaptTodo };
