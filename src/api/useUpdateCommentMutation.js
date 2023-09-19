import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useUpdateCommentMutation(successHandler) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ id, text }) =>
      axios.put(
        `${process.env.REACT_APP_API_URL}/comments/${id}`,
        {
          text,
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
