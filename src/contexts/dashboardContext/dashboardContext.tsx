// Packages
import { ReactElement, createContext, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import moment from 'moment';

// Hooks
import { useGetAllClients } from 'hooks/clients/useGetAllClients';
import { useGetAllPrices } from 'hooks/prices/useGetAllPrices';
import { useGetAllTasks } from 'hooks/tasks/useGetAllTasks';
import { useGetAllDrivers } from 'hooks/drivers/useGetAllDrivers';

// Models
import { DashboardChart } from 'models/dashboard/dashboard';
import { Task } from 'models/tasks/tasks';

export interface DashboardContextProps {
  totalClients: number;
  totalPrices: number;
  totalTasks: number;
  totalDrivers: number;
  chartDataList: Array<DashboardChart>;
  chartDateValue: Array<string> | null;
  setChartDateValue: React.Dispatch<React.SetStateAction<Array<string> | null>>;
}

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export const DashboardProvider = ({
  children,
}: DashboardProviderProps): ReactElement => {
  const [chartDateValue, setChartDateValue] = useState<Array<string> | null>([
    moment().startOf('month').format('DD/MM/YYYY'),
    moment().endOf('month').format('DD/MM/YYYY'),
  ]);

  const { data: clientsList } = useGetAllClients();
  const { data: pricesList } = useGetAllPrices();
  const { data: tasksList } = useGetAllTasks();
  const { data: driversList } = useGetAllDrivers();

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

  const totalDrivers = useMemo(() => {
    if (!Array.isArray(driversList)) {
      return 0;
    }

    return driversList?.length;
  }, [driversList]);

  const chartDataList = useMemo(() => {
    if (!Array.isArray(tasksList)) {
      return [];
    }

    return (
      tasksList
        // Filtrar os preços por data
        .filter((task) => {
          if (!chartDateValue?.length) {
            return true;
          }

          const startDate = moment(chartDateValue[0], 'DD/MM/YYYY');
          const endDate = moment(chartDateValue[1], 'DD/MM/YYYY');

          const currentDate = moment(task?.createdAt?.seconds * 1000).format(
            'DD/MM/YYYY'
          );

          return (
            moment(currentDate, 'DD/MM/YYYY').isSameOrBefore(endDate) &&
            moment(currentDate, 'DD/MM/YYYY').isSameOrAfter(startDate)
          );
        })
        // Ordenar os preços por data
        .sort((a, b) => {
          const valueA = a.createdAt.seconds * 1000;
          const valueB = b.createdAt.seconds * 1000;

          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        })
        // Agrupar os preços por data
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

            return acc;
          }

          acc.push(task);

          return acc;
        }, [])
        .map((task) => ({
          name: task?.name,
          value: task?.total ?? 0,
          createdAt: moment(task.createdAt?.seconds * 1000).format('DD/MM'),
        }))
    );
  }, [tasksList, chartDateValue]);

  return (
    <DashboardContext.Provider
      value={{
        totalClients,
        totalPrices,
        totalTasks,
        totalDrivers,
        chartDataList,
        chartDateValue,
        setChartDateValue,
      }}
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
