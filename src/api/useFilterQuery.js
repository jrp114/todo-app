import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth-context';

export default function useFilterQuery(value) {
  const { session } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);

  const { refetch } = useQuery('filter', {
    queryFn: () =>
      axios.get(
        `${process.env.REACT_APP_API_URL}/todos/filter?value=${value}`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      ),
  });
  return { refetch };
}
