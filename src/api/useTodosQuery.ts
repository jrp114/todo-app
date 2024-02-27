import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth-context';

export default function useTodosQuery(
  successHandler: (v: any) => void,
  value?: string,
) {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const ref = useRef<any>();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);

  const { refetch } = useQuery('todos', {
    retry: 0,
    queryFn: session?.token
      ? () =>
          axios.get(
            `${import.meta.env.VITE_APP_API_URL}/projects/todos?userId=${session.userId}`,
            {
              headers: {
                Authorization: `Bearer ${session.token}`,
              },
            },
          )
      : () => void 0,
    onSuccess: (result) => {
      successHandler(result?.data);
    },
    onError: (err) => {
      console.log(err);
      navigate('/login');
    },
  });
  const { refetch: filter } = useQuery('filter', {
    queryFn: () => {
      if (!value) {
        return;
      }
      ref.current = new AbortController();
      const signal = ref.current.signal;
      return axios.get(
        `${import.meta.env.VITE_APP_API_URL}/projects/todos/filter?value=${value}&userId=${session.userId}`,
        {
          signal,
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );
    },
    onSuccess: (result) => {
      successHandler(result?.data);
    },
  });
  return { refetch, filter, ref };
}
