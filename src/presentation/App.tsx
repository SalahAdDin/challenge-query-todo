import { Suspense } from "react";

import useTodos from "@application/hooks/updateTodo";
import todoUtils from "@application/utils/todo.utils";

import ErrorBox from "./components/ErrorBox/ErrorBox";
import Spinner from "./components/Spinner/Spinner";
import TodoCard from "./components/TodoCard/TodoCard";

const App = () => {
  const { data: todos, error, isLoading, mutation } = useTodos();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorBox message={error.message} />;

  const sortedTodos = [...(todos ?? [])].sort((a, b) => {
    if (todoUtils.statusOrder[a.status] !== todoUtils.statusOrder[b.status]) {
      return todoUtils.compareByStatus(a, b);
    }
    const firstDate = b.dueDate ?? new Date(1000, 0, 1);
    const secondDate = a.dueDate ?? new Date(1000, 0, 1);

    return firstDate.getTime() - secondDate.getTime();
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
        <ul className="grid gap-2">
          {sortedTodos?.map(
            ({ id, description, status, dueDate, isComplete }) => (
              <li key={id}>
                <TodoCard
                  id={id}
                  description={description}
                  status={status}
                  dueDate={dueDate}
                  onCheck={() => mutation.mutate({
                      id,
                      update: { isComplete: !isComplete },
                    })
                  }
                />
              </li>
            )
          )}
        </ul>
      </Suspense>
    </div>
  );
};

export default App;
