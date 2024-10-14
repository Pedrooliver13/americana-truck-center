// Packages
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

// Models
import { Task } from 'models/tasks/tasks';

// Services
import { getAllTasks } from 'services/tasks/getAllTasks';

export const useGetAllTasks = () => {
  const response = useQuery<Array<Task>>({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks() as Promise<Array<Task>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return {
    ...response,

    // Data sorted by createdAt
    data: response.data?.sort((a, b) => {
      const valueA = moment(a.createdAt.seconds * 1000).format('YYYY-MM-DD');
      const valueB = moment(b.createdAt.seconds * 1000).format('YYYY-MM-DD');

      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }),
  };
};
