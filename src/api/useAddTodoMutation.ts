import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';
import { Todo } from '../components/todos/todos';

export default function useAddTodoMutation(successHandler: Dispatch<any>) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (t: Todo) =>
      axios.post(
        `${import.meta.env.VITE_APP_API_URL}/todos`,
        { ...t, status: 'todo', accountId: session.accountId },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      ),
    onSuccess: (result) => {
      successHandler((prev: AxiosResponse['data']) => {
        return [...prev, result.data];
      });
    },
  });
  return { mutate };
}
