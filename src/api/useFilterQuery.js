import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth-context';

export default function useFilterQuery(value) {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);

  const { refetch } = useQuery('filter', {
    queryFn: () => {
      if (!value) {
        return;
      }
      ref.current = new AbortController();
      const signal = ref.current.signal;
      return axios.get(
        `${process.env.REACT_APP_API_URL}/todos/filter?value=${value}`,
        {
          signal,
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );
    },
  });
  return { refetch, ref };
}
