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

export interface DashboardContextProps {
  totalClients: number;
  totalPrices: number;
  totalTasks: number;
  totalDrivers: number;
  chartData: DashboardChart;
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

  const chartData = useMemo(() => {
    if (!Array.isArray(tasksList)) {
      return { categories: [], series: [] };
    }

    const groupedData = tasksList
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
      // Ordenar por data
      .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
      // Agrupar os preços por data e status
      .reduce((acc: Record<string, Record<string, number>>, task) => {
        const formattedDate = moment(task.createdAt.seconds * 1000).format(
          'DD/MM'
        );
        const status = task.status || 'Sem Status';

        if (!acc[formattedDate]) {
          acc[formattedDate] = {};
        }
        if (!acc[formattedDate][status]) {
          acc[formattedDate][status] = 0;
        }

        acc[formattedDate][status] += task.total;

        return acc;
      }, {});

    const seriesNames = Array.from(
      new Set(tasksList.map((task) => task.status || 'Sem Status'))
    );

    return {
      categories: Object.keys(groupedData),
      series: seriesNames.map((status) => ({
        name: status,
        data: Object.keys(groupedData).map(
          (date) => groupedData[date][status] || 0
        ),
      })),
    };
  }, [tasksList, chartDateValue]);

  return (
    <DashboardContext.Provider
      value={{
        totalClients,
        totalPrices,
        totalTasks,
        totalDrivers,
        chartData,
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
