import { useMemo } from "react";

import { Todo } from "@domain/todo.model";

type TodoCardProps = Todo & {
  onCheck: () => void;
};

const TodoCard = ({
  description,
  isComplete,
  dueDate,
  onCheck,
}: TodoCardProps) => {
  const [
    border,
    darkBorder,
    backgroundColor,
    darkBackgroundColor,
    hoverColor,
    textColor,
  ] = useMemo(() => {
    const now = new Date();

    if (isComplete)
      return [
        "border-green-200",
        "border-green-700",
        "bg-green-100",
        "bg-green-800",
        "hover:bg-green-200",
        "text-green-700",
      ];
    if (now > dueDate)
      return [
        "border-red-200",
        "border-red-700",
        "bg-red-100",
        "bg-red-800",
        "hover:bg-red-200",
        "text-red-700",
      ];

    return [
      "border-gray-200",
      "border-gray-700",
      "bg-gray-100",
      "bg-gray-800",
      "hover:bg-gray-200",
      "text-gray-700",
    ];
  }, [dueDate, isComplete]);

  return (
    <div
      className={`block rounded-lg border ${border} px-6 py-3 shadow ${hoverColor} dark:${darkBorder} dark:${darkBackgroundColor} dark:hover:${darkBorder} ${backgroundColor} ${isComplete ? "line-through" : ""} ${textColor}`}>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={onCheck}
        className={`rounded ${textColor} border ${border}`}
      />
      <span className="ml-2">{description}</span>
      {dueDate && (
        <span className="ml-2 text-sm text-gray-500">
          {new Date(dueDate).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default TodoCard;
