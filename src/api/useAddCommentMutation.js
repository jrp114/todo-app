import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useAddCommentMutation(successHandler) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ id, text }) =>
      axios.post(
        `${process.env.REACT_APP_API_URL}/comments`,
        {
          todo_id: id,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        },
      ),
    onSuccess: () => successHandler(),
  });
  return { mutate };
}
