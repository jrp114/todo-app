import axios from 'axios';
import { useMutation } from 'react-query';
import { Maybe } from 'yup';
import { useAuthContext } from '../auth-context';
import { Task } from '../feature-main/main';

interface UpdateTaskMutationFunctionArgs {
  taskListId: number;
  position: number;
}

export default function useUpdateTaskMutation(
  successHandler: () => void,
  current: Maybe<Task>,
) {
  const { session } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: ({ taskListId, position }: UpdateTaskMutationFunctionArgs) => {
      return axios.put(
        `${import.meta.env.VITE_APP_API_URL}/tasks/${current?.id}`,
        {
          ...current,
          taskListId,
          position,
          origin: current?.taskListId,
          originalPosition: current?.position,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );
    },
    onSuccess: () => successHandler(),
  });
  return { mutate };
}
