import axios from 'axios';
import { useMutation } from 'react-query';

export default function useLoginMutation(
  successHandler: any,
  errorHandler: any,
) {
  const { mutate } = useMutation({
    mutationFn: (v) =>
      axios.post(`${process.env.REACT_APP_API_URL}/users/login`, v),
    onSuccess: (result) => {
      localStorage.setItem('todo-app-session', JSON.stringify(result?.data));
      successHandler();
    },
    onError: () => errorHandler(),
  });
  return { mutate };
}
