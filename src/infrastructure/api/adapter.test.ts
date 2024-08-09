import { BETodo } from "@domain/todo.model";

import adapter from "./adapter";

describe("adaptTodo", () => {
  const createBETodo = (overrides: Partial<BETodo> = {}): BETodo => ({
    id: 1,
    description: "Test Description",
    isComplete: false,
    dueDate: null,
    ...overrides,
  });

  it("should mark the todo as 'completed' when isComplete is true", () => {
    const beTodo = createBETodo({ isComplete: true });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo.status).toBe("completed");
  });

  it("should mark the todo as 'overdue' when the due date is in the past and isComplete is false", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const beTodo = createBETodo({ dueDate: pastDate.toISOString() });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo.status).toBe("overdue");
  });

  it("should mark the todo as 'going' when the due date is in the future and isComplete is false", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const beTodo = createBETodo({ dueDate: futureDate.toISOString() });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo.status).toBe("going");
  });

  it("should handle the absence of a due date and set status as 'going'", () => {
    const beTodo = createBETodo({ dueDate: null });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo.status).toBe("going");
  });

  it("should correctly adapt the dueDate to a Date object", () => {
    const dueDateString = new Date().toISOString();
    const beTodo = createBETodo({ dueDate: dueDateString });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo.dueDate).toEqual(new Date(dueDateString));
  });

  it("should handle todos when there is not a dueDate", () => {
    const beTodo = createBETodo({ dueDate: null });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo.dueDate).toBeNull();
  });

  it("should return the adapted todo with all properties when the original BETodo if given", () => {
    const beTodo = createBETodo({
      id: 2,
      description: "Another description",
    });
    const adaptedTodo = adapter.adaptTodo(beTodo);
    expect(adaptedTodo).toMatchObject(beTodo);
  });
});
