import { BETodo, Todo } from "@domain/todo.model";
import adapter from "@infrastructure/api/adapter";

import client from "./client";
import endpoint from "./endpoint";
import service from "./service";

const mockBETodos: Array<BETodo> = [
  {
    id: 1,
    description: "Test 1",
    isComplete: false,
    dueDate: "2024-08-08T00:00:00Z",
  },
  {
    id: 2,
    description: "Test 2",
    isComplete: true,
    dueDate: null,
  },
];

const mockAdaptedTodos: Array<Todo> = [
  {
    id: 1,
    description: "Test 1",
    isComplete: false,
    dueDate: new Date("2024-08-08T00:00:00Z"),
    status: "going",
  },
  {
    id: 2,
    description: "Test 2",
    isComplete: true,
    dueDate: null,
    status: "completed",
  },
];

describe("todoService", () => {
  describe("fetchTodos", () => {
    it("should fetch todos and adapt them using the adapter", async () => {
      vi.spyOn(client, "get").mockResolvedValue({ data: mockBETodos });

      vi.spyOn(adapter, "adaptTodo").mockImplementation(
        (todo) => mockAdaptedTodos.find((adaptedTodo) => adaptedTodo.id === todo.id)!
      );

      const todos = await service.fetchTodos();

      expect(todos).toEqual(mockAdaptedTodos);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(client.get).toHaveBeenCalledWith(endpoint.get);
      expect(adapter.adaptTodo).toHaveBeenCalledTimes(mockBETodos.length);
    });
  });

  describe("updateTodo", () => {
    it("should send a PATCH request with the correct data when a todo is updated", async () => {
      const update = { title: "Updated Todo", isComplete: true };
      const todoId = 1;

      const patchSpy = vi.spyOn(client, "patch").mockResolvedValue({});

      await service.updateTodo({ id: todoId, update });

      expect(patchSpy).toHaveBeenCalledWith(
        `${endpoint.patch}/${todoId}`,
        update
      );
    });
  });
});
