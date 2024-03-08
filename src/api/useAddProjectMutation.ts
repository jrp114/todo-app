import axios, { AxiosResponse } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useAddTaskListMutation(
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<AxiosResponse<any, any> | undefined, unknown>
  >,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (p: any) =>
      axios.post(
        `${import.meta.env.VITE_APP_API_URL}/tasklists`,
        {
          ...p,
          userId: session.userId,
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
