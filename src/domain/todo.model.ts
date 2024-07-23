type TodoStatus = "completed" | "going" | "overdue";

type Todo = {
  id: number;
  description: string;
  status: TodoStatus;
  dueDate: Date | null;
  isComplete: boolean;
};

type BETodo = Omit<Todo, "dueDate" | "status"> & {
  dueDate: string | null;
};

export type { BETodo, Todo, TodoStatus };
