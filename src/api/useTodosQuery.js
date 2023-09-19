import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth-context';

export default function useTodosQuery(successHandler) {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);
  const { refetch } = useQuery('todos', {
    queryFn: session?.token
      ? () =>
          axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          })
      : () => void 0,
    onSuccess: (result) => {
      successHandler(result.data);
    },
  });
  return { refetch };
}
