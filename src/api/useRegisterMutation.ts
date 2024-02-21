import axios from 'axios';
import { useMutation } from 'react-query';

export interface RegisterMutationFunctionArgs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function useRegisterMutation(
  successHandler: () => void,
  errorHandler: () => void,
) {
  const { mutate } = useMutation({
    mutationFn: (v: RegisterMutationFunctionArgs) =>
      axios.post(`${import.meta.env.VITE_APP_API_URL}/users`, v),
    onSuccess: (result) => {
      localStorage.setItem('todo-app-session', JSON.stringify(result?.data));
      successHandler();
    },
    onError: () => errorHandler(),
  });
  return { mutate };
}
