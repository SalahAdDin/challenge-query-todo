import { BETodo, Todo } from "@domain/todo.model";
import adapter from "@infrastructure/api/adapter";

import client from "./client";
import endpoint from "./endpoint";

const fetchTodos = async (): Promise<Array<Todo>> => {
  const { data } = await client.get<Array<BETodo>>(endpoint.get);

  return data.map((todo) => adapter.adaptTodo(todo));
};

type UpdateTodoProps = { id: number; update: Partial<Omit<Todo, "id">> };

const updateTodo = async ({ id, update }: UpdateTodoProps) => {
  await client.patch(`${endpoint.patch}/${id}`, update);
};

const service = { fetchTodos, updateTodo };

export default service;
