import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth-context';
import { Todo } from '../components/todos/todos';

export default function useTodosQuery(
  successHandler: (a: Array<Todo>, b: Array<Todo>) => void,
  value?: string,
) {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const ref = useRef<any>();

  const handleSeparate = (result?: AxiosResponse) => {
    if (result?.data) {
      const t: Array<Todo> = [];
      const c: Array<Todo> = [];
      result.data.forEach((r: Todo) => {
        if (r.status === 'todo') {
          t.push(r);
        } else {
          c.push(r);
        }
      });
      successHandler(t, c);
    }
  };

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
            `${import.meta.env.VITE_APP_API_URL}/todos?accountId=${session.accountId}`,
            {
              headers: {
                Authorization: `Bearer ${session.token}`,
              },
            },
          )
      : () => void 0,
    onSuccess: (result) => {
      handleSeparate(result);
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
        `${import.meta.env.VITE_APP_API_URL}/todos/filter?value=${value}&accountId=${session.accountId}`,
        {
          signal,
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );
    },
    onSuccess: (result) => {
      handleSeparate(result);
    },
  });
  return { refetch, filter, ref };
}
