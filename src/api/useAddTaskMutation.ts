import axios, { AxiosResponse } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import { useAuthContext } from '../auth-context';
import { Task } from '../feature-main/main';

export default function useAddTaskMutation(
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<AxiosResponse<any, any> | undefined, unknown>
  >,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (t: Task) =>
      axios.post(
        `${import.meta.env.VITE_APP_API_URL}/tasks`,
        {
          ...t,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      ),
    onSuccess: () => refetch(),
  });
  return { mutate };
}
