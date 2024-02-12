import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useUpdateTodoMutation(
  current: any,
  successHandler: any,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ list, position }: any) => {
      return axios.put(
        `${process.env.REACT_APP_API_URL}/todos/${current.id}`,
        {
          ...current,
          status: list,
          position,
          origin: current.status,
          originalPosition: current.position,
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
