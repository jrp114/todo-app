import axios from 'axios';
import { Dispatch } from 'react';
import { useMutation } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useAddTodoMutation(successHandler: Dispatch<any>) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (t: Array<any>) =>
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
      successHandler((prev: any) => {
        return [...prev, result.data];
      });
    },
  });
  return { mutate };
}
