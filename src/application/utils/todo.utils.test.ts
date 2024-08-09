import { Todo, TodoStatus } from "@domain/todo.model";

import utils from "./todo.utils";

describe("compareByStatus", () => {
  const createTodo = (status: TodoStatus): Todo => ({
    description: "Test Description",
    status,
    id: 0,
    dueDate: null,
    isComplete: false,
  });

  it("should return a negative number when the first todo has a lower status order", () => {
    const todoA = createTodo("overdue");
    const todoB = createTodo("going");
    const result = utils.compareByStatus(todoA, todoB);
    expect(result).toBeLessThan(0);
  });

  it("should return a positive number when the first todo has a higher status order", () => {
    const todoA = createTodo("completed");
    const todoB = createTodo("going");
    const result = utils.compareByStatus(todoA, todoB);
    expect(result).toBeGreaterThan(0);
  });

  it("should return 0 when both todos have the same status", () => {
    const todoA = createTodo("going");
    const todoB = createTodo("going");
    const result = utils.compareByStatus(todoA, todoB);
    expect(result).toBe(0);
  });
});
