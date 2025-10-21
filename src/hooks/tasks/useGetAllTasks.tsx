// Packages
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

// Models
import {
  ETaskServiceStatus,
  serviceStatusName,
  statusName,
  Task,
} from 'models/tasks/tasks';

// Services
import { getAllTasks } from 'services/tasks/getAllTasks';

export const useGetAllTasks = (id?: string) => {
  const response = useQuery<Array<Task>>({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks() as Promise<Array<Task>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id),
  });

  if (!response?.data || !Array.isArray(response?.data)) {
    return { ...response, data: [] };
  }

  return {
    ...response,

    // Data sorted by createdAt
    data: response?.data
      ?.map((task) => ({
        ...task,
        statusName: statusName[task?.status],
        serviceStatusName:
          serviceStatusName[task?.serviceStatus || ETaskServiceStatus.PENDING],
      }))
      .sort((a, b) => {
        const dateA = moment(a?.createdAt?.seconds * 1000);
        const dateB = moment(b?.createdAt?.seconds * 1000);

        return dateB.diff(dateA);
      }),
  };
};
