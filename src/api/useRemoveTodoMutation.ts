import axios, { AxiosResponse } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import { useAuthContext } from '../auth-context';
import { Todo } from '../components/todos/todos';

export default function useRemoveTodoMutation(
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>,
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<AxiosResponse<any, any> | undefined, unknown>
  >,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${import.meta.env.VITE_APP_API_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }),
    onSuccess: (result, id: string) => {
      if (result.data.status === 'todo')
        setTodos((prev) => {
          return prev.filter((t) => t.id.toString() !== id);
        });
      else
        setCompleted((prev) => {
          return prev.filter((t) => t.id.toString() !== id);
        });
      refetch();
    },
  });
  return { mutate };
}
