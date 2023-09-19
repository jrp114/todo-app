import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useAddTodoMutation(successHandler) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (t) =>
      axios.post(
        `${process.env.REACT_APP_API_URL}/todos`,
        { ...t, status: 'todo' },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      ),
    onSuccess: (result) => {
      successHandler((prev) => {
        return [...prev, result.data];
      });
    },
  });
  return { mutate };
}
