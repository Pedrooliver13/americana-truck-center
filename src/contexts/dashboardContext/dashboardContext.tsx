// Packages
import { ReactElement, createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// Hooks
import { useGetAllClients } from 'hooks/clients/useGetAllClients';
import { useGetAllPrices } from 'hooks/prices/useGetAllPrices';
import { useGetAllTasks } from 'hooks/tasks/useGetAllTasks';

export interface DashboardContextProps {
  totalClients: number;
  totalPrices: number;
  totalTasks: number;
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

  return (
    <DashboardContext.Provider
      value={{ totalClients, totalPrices, totalTasks }}
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
