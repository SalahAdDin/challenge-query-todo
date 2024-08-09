/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Mock } from "vitest";

import { Todo } from "@domain/todo.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-hooks";

import useTodos from "./updateTodo";

const mockTodos: Array<Todo> = [
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

vi.mock("@infrastructure/api/service");
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

describe("useTodos", () => {
  const queryClient = {
    invalidateQueries: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useQueryClient as Mock).mockReturnValue(queryClient);
  });

  it("should return the correct data, error, and isLoading states from useQuery", async () => {
    (useQuery as Mock).mockReturnValue({
      data: mockTodos,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useTodos());

    expect(result.current.data).toEqual(mockTodos);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle error state from useQuery", async () => {
    const mockError = new Error("Failed to fetch todos");

    (useQuery as Mock).mockReturnValue({
      data: null,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useTodos());

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it("should return isLoading state from useQuery", async () => {
    (useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useTodos());

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it("should call invalidateQueries on mutation success", async () => {
    (useMutation as Mock).mockImplementation(({ onSuccess }) => ({
      mutate: async () => {
        if (onSuccess) await onSuccess();
      },
      isLoading: false,
      error: null,
      data: null,
    }));

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      result.current.mutation.mutate({
        id: 1,
        update: { description: "Updated Todo" },
      });
    });

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["todos"],
    });
  });
});
