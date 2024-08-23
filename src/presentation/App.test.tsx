// Mock dependencies
import useTodos from "@application/hooks/updateTodo";
import { render, screen } from "@application/utils/test-utils";
import todoUtils from "@application/utils/todo.utils";

import App from "./App";

vi.mock("./components/Spinner/Spinner", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("./components/ErrorBox/ErrorBox", () => ({
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

vi.mock("./components/TodoCard/TodoCard", () => ({
  default: ({ description }: { description: string }) => (
    <div>{description}</div>
  ),
}));

vi.mock("@application/hooks/updateTodo");
vi.mock("@application/utils/todo.utils");

describe("App Component", () => {
  it("should renders a Spinner when it is loading", () => {
    vi.mocked(useTodos).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,

      // @ts-expect-error no time to look over the right way to type it, but opened a question about it on discord
      mutation: { mutate: vi.fn() },
    });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render ErrorBox when it gets an error", () => {
    const errorMessage = "Something went wrong";
    vi.mocked(useTodos).mockReturnValue({
      data: undefined,
      error: { name: "Mock Error", message: errorMessage },
      isLoading: false,

      // @ts-expect-error no time to look over the right way to type it, but opened a question about it on discord
      mutation: { mutate: vi.fn() },
    });

    render(<App />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render TodoCard components when data is available", () => {
    const todos = [
      {
        id: 1,
        description: "First Todo",
        status: "going",
        dueDate: null,
        isComplete: false,
      },
      {
        id: 2,
        description: "Second Todo",
        status: "completed",
        dueDate: null,
        isComplete: true,
      },
    ];

    vi.mocked(useTodos).mockReturnValue({
      data: todos,
      error: null,
      isLoading: false,

      // @ts-expect-error no time to look over the right way to type it, but opened a question about it on discord
      mutation: { mutate: vi.fn() },
    });

    todoUtils.compareByStatus = vi.fn(() => 0); // Mock comparison function
    todoUtils.statusOrder = { overdue: 1, going: 2, completed: 3 };

    render(<App />);

    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });
});
