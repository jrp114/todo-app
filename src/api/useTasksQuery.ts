import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth-context';
import { useAbortController } from '../components';

export default function useTasksQuery(
  successHandler: (v: any) => void,
  value?: string,
) {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const { ref, signal } = useAbortController();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);

  const { refetch } = useQuery('tasks', {
    retry: 0,
    queryFn: session?.token
      ? () =>
          axios.get(
            `${import.meta.env.VITE_APP_API_URL}/tasklists/tasks?userId=${session.userId}`,
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
      return axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tasklists/tasks/filter?value=${value}&userId=${session.userId}`,
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
