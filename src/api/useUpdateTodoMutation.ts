import axios from 'axios';
import { useMutation } from 'react-query';
import { Maybe } from 'yup';
import { useAuthContext } from '../auth-context';
import { Todo } from '../components/todos/todos';

interface UpdateTodoMutationFunctionArgs {
  list: string;
  position: number;
}

export default function useUpdateTodoMutation(
  successHandler: () => void,
  current: Maybe<Todo>,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ list, position }: UpdateTodoMutationFunctionArgs) => {
      return axios.put(
        `${import.meta.env.VITE_APP_API_URL}/todos/${current?.id}`,
        {
          ...current,
          status: list,
          position,
          origin: current?.status,
          originalPosition: current?.position,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );
    },
    onSuccess: () => successHandler(),
  });
  return { mutate };
}
