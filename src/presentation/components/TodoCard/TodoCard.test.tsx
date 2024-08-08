import { render, screen, userEvent } from "@application/utils/test-utils";

import TodoCard, { TodoCardProps } from "./TodoCard";

const mockDueDate = new Date("2024-08-10");

describe("TodoCard", () => {
  const mockOnCheck = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = ({
    description,
    status,
    dueDate,
    onCheck,
  }: TodoCardProps) => render(
      <TodoCard
        description={description}
        status={status}
        dueDate={dueDate}
        onCheck={onCheck}
      />
    );

  it("should render the TodoCard component when the description and due date is given", () => {
    const props = {
      description: "Test Todo",
      status: "going",
      dueDate: mockDueDate,
      onCheck: mockOnCheck,
    } satisfies TodoCardProps;

    renderComponent(props);
    screen.debug();
    const descriptionElement = screen.getByText(/Test Todo/i);
    expect(descriptionElement).toBeInTheDocument();

    const dueDateElement = screen.getByText(mockDueDate.toLocaleDateString());
    expect(dueDateElement).toBeInTheDocument();
  });

  it("should render the checkbox as checked when the status is completed", () => {
    const props = {
      description: "Completed Todo",
      status: "completed",
      dueDate: null,
      onCheck: mockOnCheck,
    } satisfies TodoCardProps;

    renderComponent(props);

    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeChecked();
  });

  it("should render the checkbox as unchecked when the status is not completed", () => {
    const props = {
      description: "Ongoing Todo",
      status: "going",
      dueDate: null,
      onCheck: mockOnCheck,
    } satisfies TodoCardProps;

    renderComponent(props);

    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).not.toBeChecked();
  });

  it("should call the onCheck function when the checkbox is clicked", async () => {
    const props = {
      description: "Test Todo",
      status: "going",
      dueDate: null,
      onCheck: mockOnCheck,
    } satisfies TodoCardProps;

    renderComponent(props);

    const checkboxElement = screen.getByRole("checkbox");
    await userEvent.click(checkboxElement);

    expect(mockOnCheck).toHaveBeenCalledTimes(1);
  });

  it("should applies the correct styles based on the status", () => {
    const props = {
      description: "Overdue Todo",
      status: "overdue",
      dueDate: null,
      onCheck: mockOnCheck,
    } satisfies TodoCardProps;

    renderComponent(props);

    const todoElement = screen.getByText(/Overdue Todo/i).closest("div");
    expect(todoElement).toHaveClass("border-red-200");
    expect(todoElement).toHaveClass("bg-red-100");
    expect(todoElement).toHaveClass("hover:bg-red-200");
    expect(todoElement).toHaveClass("text-red-700");
  });
});
