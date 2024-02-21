import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useCommentsQuery(id?: number) {
  const { session } = useAuthContext();
  const { data, refetch } = useQuery('comments', {
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/comments?todoId=${id}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })
        .then((res) => res.data),
  });
  return { data, refetch };
}
