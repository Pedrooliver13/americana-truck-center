// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Task } from 'models/tasks/tasks';

// Services
import { getByIdTask } from 'services/tasks/getByIdTask';

export const useGetByIdTask = (id?: string) => {
  const response = useQuery<Task>({
    queryKey: ['task-by-id', id],
    queryFn: () => getByIdTask(id) as Promise<Task>,
    enabled: Boolean(id),
  });

  return response;
};
