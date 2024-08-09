import { useMemo } from "react";

import { Todo } from "@domain/todo.model";

type TodoCardProps = Omit<Todo, "isComplete" | "id"> & {
  onCheck: () => void;
};

const TodoCard = ({ description, status, dueDate, onCheck }: TodoCardProps) => {
  const [border, darkBorder, backgroundColor, darkBackgroundColor, hoverColor] =    useMemo(
      () => ({
          completed: [
            "border-green-200",
            "border-green-700",
            "bg-green-100",
            "bg-green-800",
            "hover:bg-green-200",
            "text-green-700",
          ],
          overdue: [
            "border-red-200",
            "border-red-700",
            "bg-red-100",
            "bg-red-800",
            "hover:bg-red-200",
            "text-red-700",
          ],
          going: [
            "border-gray-200",
            "border-gray-700",
            "bg-gray-100",
            "bg-gray-800",
            "hover:bg-gray-200",
            "text-gray-700",
          ],
        })[status],
      [status]
    );

  return (
    <div
      className={`block border ${border} px-4 py-3 shadow ${hoverColor} dark:${darkBorder} dark:${darkBackgroundColor} dark:hover:${darkBorder} ${backgroundColor} ${status === "completed" ? "line-through" : ""} flex items-center justify-between text-lg capitalize text-black`}>
      <label htmlFor="completed">
        <input
          name="completed"
          type="checkbox"
          checked={status === "completed"}
          onChange={onCheck}
          className="mr-3 border border-black text-black"
        />
        {description}
      </label>
      {dueDate && (
        <span className="border border-black px-2 py-1 text-lg text-gray-700">
          {dueDate.toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export type { TodoCardProps };
export default TodoCard;
