import axios from 'axios';
import { useMutation } from 'react-query';

export default function useRegisterMutation(
  successHandler: any,
  errorHandler: any,
) {
  const { mutate } = useMutation({
    mutationFn: (v) =>
      axios.post(`${import.meta.env.VITE_APP_API_URL}/users`, v),
    onSuccess: (result) => {
      localStorage.setItem('todo-app-session', JSON.stringify(result?.data));
      successHandler();
    },
    onError: () => errorHandler(),
  });
  return { mutate };
}
