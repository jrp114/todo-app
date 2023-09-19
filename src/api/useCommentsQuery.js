import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useCommentsQuery(id) {
  const { session } = useAuthContext();
  const { data, loading, refetch } = useQuery('comments', {
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/comments?todoId=${id}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })
        .then((res) => res.data),
  });
  return { data, loading, refetch };
}
