import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useRemoveTodoMutation(
  setTodos: any,
  setCompleted: any,
  refetch: any,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (id) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }),
    onSuccess: (result, id) => {
      if (result.data.status === 'todo')
        setTodos((prev: any) => {
          return prev.filter((t: any) => t.id !== id);
        });
      else
        setCompleted((prev: any) => {
          return prev.filter((t: any) => t.id !== id);
        });
      refetch();
    },
  });
  return { mutate };
}
