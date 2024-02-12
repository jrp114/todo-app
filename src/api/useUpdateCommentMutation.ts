import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useUpdateCommentMutation(successHandler: any) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ id, text }: any) =>
      axios.put(
        `${import.meta.env.VITE_APP_API_URL}/comments/${id}`,
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
