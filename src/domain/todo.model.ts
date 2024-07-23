type Todo = {
  id: number;
  description: string;
  isComplete: boolean;
  dueDate: Date;
};

type BETodo = Omit<Todo, "dueDate"> & {
  dueDate: string;
};

export type { BETodo, Todo };
