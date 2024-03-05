import axios, { AxiosResponse } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import { useAuthContext } from '../auth-context';

export default function useRemoveTaskMutation(
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<AxiosResponse<any, any> | undefined, unknown>
  >,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }),
    onSuccess: () => {
      refetch();
    },
  });
  return { mutate };
}
