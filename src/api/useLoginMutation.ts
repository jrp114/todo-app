import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function useLoginMutation() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (v) =>
      axios.post(`${import.meta.env.VITE_APP_API_URL}/users/login`, v),
    onSuccess: (result) => {
      localStorage.setItem('todo-app-session', JSON.stringify(result?.data));
      navigate('/');
    },
    onError: () => navigate('/login'),
  });
  return { mutate };
}
