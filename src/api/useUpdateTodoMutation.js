import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useUpdateTodoMutation(current, successHandler) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (list) =>
      axios.put(
        `${process.env.REACT_APP_API_URL}/todos/${current.id}`,
        {
          ...current,
          status: list,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      ),
    onSuccess: () => successHandler(),
  });
  return { mutate };
}
