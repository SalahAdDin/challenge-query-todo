// import { Outlet } from "@tanstack/react-router";

import { Suspense } from "react";

import useTodos from "@application/hooks/updateTodo";

import ErrorBox from "./components/ErrorBox/ErrorBox";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  const { data: todos, error, isLoading, mutation } = useTodos();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorBox message={error.message} />;

  const sortedTodos = [...(todos ?? [])].sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    if (a.dueDate && b.dueDate)
      return new Date(a.dueDate) > new Date(b.dueDate) ? 1 : -1;
    return 0;
  });

  return (
    <div className="container my-8 max-w-screen-lg">
      <Suspense
        fallback={
          <div className="flex h-[75vh] w-full flex-col items-center justify-center">
            <Spinner />
          </div>
        }>
        <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
        <ul>
          {sortedTodos?.map((todo) => (
            <li
              key={todo.id}
              className={`border-b p-2 ${todo.isComplete ? "line-through" : ""} ${new Date(todo.dueDate) < new Date() && !todo.isComplete ? "text-red-500" : ""}`}>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => mutation.mutate({
                    id: todo.id,
                    update: { isComplete: true },
                  })
                }
              />
              <span className="ml-2">{todo.description}</span>
              {todo.dueDate && (
                <span className="ml-2 text-sm text-gray-500">
                  due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default App;
