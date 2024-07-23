import service from "@infrastructure/api/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTodos = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: service.fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: service.updateTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { data, error, isLoading, mutation };
};

export default useTodos;
