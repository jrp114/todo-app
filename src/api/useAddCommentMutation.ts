import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

interface AddCommentMutationProps {
  id?: number;
  text?: string;
}

export default function useAddCommentMutation(successHandler: () => void) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ id, text }: AddCommentMutationProps) =>
      axios.post(
        `${import.meta.env.VITE_APP_API_URL}/comments`,
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
