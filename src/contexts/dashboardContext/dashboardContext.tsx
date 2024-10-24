// Packages
import { ReactElement, createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import moment from 'moment';

// Hooks
import { useGetAllClients } from 'hooks/clients/useGetAllClients';
import { useGetAllPrices } from 'hooks/prices/useGetAllPrices';
import { useGetAllTasks } from 'hooks/tasks/useGetAllTasks';

// Models
import { DashboardChart } from 'models/dashboard/dashboard';
import { Task } from 'models/tasks/tasks';

export interface DashboardContextProps {
  totalClients: number;
  totalPrices: number;
  totalTasks: number;
  chartDataList: Array<DashboardChart>;
}

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export const DashboardProvider = ({
  children,
}: DashboardProviderProps): ReactElement => {
  const { data: clientsList } = useGetAllClients();
  const { data: pricesList } = useGetAllPrices();
  const { data: tasksList } = useGetAllTasks();

  const totalClients = useMemo(() => {
    if (!Array.isArray(clientsList)) {
      return 0;
    }

    return clientsList?.length;
  }, [clientsList]);

  const totalPrices = useMemo(() => {
    if (!Array.isArray(pricesList)) {
      return 0;
    }

    return pricesList?.length;
  }, [pricesList]);

  const totalTasks = useMemo(() => {
    if (!Array.isArray(tasksList)) {
      return 0;
    }

    return tasksList?.length;
  }, [tasksList]);

  const chartDataList = useMemo(() => {
    if (!Array.isArray(tasksList)) {
      return [];
    }

    return tasksList
      .sort((a, b) => {
        const valueA = a.createdAt.seconds * 1000;
        const valueB = b.createdAt.seconds * 1000;

        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      })
      .reduce((acc: Task[], task) => {
        const lastTask = acc[acc.length - 1] as Task | undefined;

        if (!lastTask) {
          return [{ ...task, total: task.total }];
        }

        const currentDate = moment(task.createdAt.seconds * 1000).format(
          'DD/MM'
        );
        const lastTaskDate = moment(lastTask.createdAt.seconds * 1000).format(
          'DD/MM'
        );

        if (currentDate === lastTaskDate) {
          lastTask.total += task.total;
        } else {
          acc.push(task);
        }

        return acc;
      }, [])
      .map((task) => ({
        name: task?.name,
        value: task?.total ?? 0,
        createdAt: moment(task.createdAt?.seconds * 1000).format('DD/MM'),
      }));
  }, [tasksList]);

  return (
    <DashboardContext.Provider
      value={{ totalClients, totalPrices, totalTasks, chartDataList }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const DashboardContextLayout = () => {
  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
};
