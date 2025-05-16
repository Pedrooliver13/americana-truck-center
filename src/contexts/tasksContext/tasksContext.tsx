// Packages
import { ReactElement, createContext, useCallback, useMemo } from 'react';
import {
  NavigateFunction,
  useNavigate,
  Outlet,
  useParams,
} from 'react-router-dom';
import moment from 'moment';

// Hooks
import { usePostTask } from 'hooks/tasks/usePostTask';
import { useGetAllTasks } from 'hooks/tasks/useGetAllTasks';
import { useGetByIdTask } from 'hooks/tasks/useGetByIdTask';
import { useGetAllPrices } from 'hooks/prices/useGetAllPrices';
import { useDeleteByIdTask } from 'hooks/tasks/useDeleteTaskById';
import { useGetAllClients } from 'hooks/clients/useGetAllClients';
import { useGetAllDrivers } from 'hooks/drivers/useGetAllDrivers';
import { useDeleteBatchTaskByIds } from 'hooks/tasks/useDeleteBatchTaskByIds';

// Models
import { Task, TasksToExport, PostTask, statusName } from 'models/tasks/tasks';
import { Prices } from 'models/prices/prices';
import { Clients } from 'models/clients/clients';
import { Drivers } from 'models/drivers/drivers';

// Utils
import { convertCurrencyToNumber } from 'utils/formatter';

export interface TasksContextProps {
  id?: string;
  tasksList?: Array<Task>;
  taskItem?: Task;
  driversList?: Array<Drivers>;
  pricesList?: Array<Prices>;
  clientsList?: Array<Clients>;
  driverListOptions: Array<Drivers>;
  clientListOptions: Array<Clients>;
  formatedDataToExport?: Array<TasksToExport>;
  navigate: NavigateFunction;
  createTask: (data: PostTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteBatchTasks: (ids: Array<string>) => Promise<void>;
  isLoading: boolean;
}

interface TasksProviderProps {
  children: React.ReactNode;
}

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({
  children,
}: TasksProviderProps): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get's
  const { data: tasksList, isFetching: isFetchingTasksList } =
    useGetAllTasks(id);

  const { data: taskItem, isFetching: isFetchingTaskItem } = useGetByIdTask(id);

  const { data: pricesList, isFetching: isFetchingPricesList } =
    useGetAllPrices(id);

  const { data: clientsList, isFetching: isFetchingClientsList } =
    useGetAllClients(id);

  const { data: driversList, isFetching: isFetchingDriversList } =
    useGetAllDrivers();

  // Mutate's
  const { mutateAsync: createTaskMutate, isPending: isPendingPostTask } =
    usePostTask();

  const { mutateAsync: deleteTaskMutate, isPending: isPendingDeleteTask } =
    useDeleteByIdTask();

  const {
    mutateAsync: deleteBatchTaskMutate,
    isPending: isPendingDeleteBatchTask,
  } = useDeleteBatchTaskByIds();

  const formatedDataToExport = useMemo(() => {
    return tasksList?.map((item) => {
      return {
        CLIENTE: item?.currentClient?.name ?? '',
        NOME: item?.name,
        'DOCUMENTO DO MOTORISTA': item?.driverDocument,
        'DOCUMENTO DO CLIENTE': item?.document,
        PLACA: item?.licensePlate,
        FROTA: item?.fleet,
        'TOTAL(R$)': convertCurrencyToNumber(String(item?.total)) ?? 0,
        SERVIÇOS: item?.services?.map((service) => service?.name).join(', '),
        DATA: moment(item?.createdAt?.seconds * 1000).format('DD/MM/YYYY'),
        STATUS: statusName[item?.status],
      };
    });
  }, [tasksList]);

  const driverListOptions = useMemo(() => {
    if (!Array.isArray(driversList)) {
      return [];
    }

    return driversList?.map((item) => {
      return {
        ...item,
        label: item?.name,
        value: item?.id,
      };
    });
  }, [driversList]);

  const clientListOptions = useMemo(() => {
    if (!Array.isArray(clientsList)) {
      return [];
    }

    return clientsList?.map((item) => {
      return {
        ...item,
        label: item?.name,
        value: item?.id,
      };
    });
  }, [clientsList]);

  const createTask = useCallback(
    async (data: PostTask): Promise<void> => {
      createTaskMutate(data);
    },
    [createTaskMutate]
  );

  const deleteTask = useCallback(
    async (id: string): Promise<void> => {
      deleteTaskMutate(id);
    },
    [deleteTaskMutate]
  );

  const deleteBatchTasks = useCallback(
    async (ids: Array<string>): Promise<void> => {
      await deleteBatchTaskMutate(ids);
    },
    [deleteBatchTaskMutate]
  );

  return (
    <TasksContext.Provider
      value={{
        id,
        tasksList,
        taskItem,
        pricesList,
        clientsList,
        driversList,
        clientListOptions,
        driverListOptions,
        formatedDataToExport,
        navigate,
        createTask,
        deleteTask,
        deleteBatchTasks,
        isLoading:
          isPendingDeleteTask ||
          isPendingPostTask ||
          isFetchingTasksList ||
          isFetchingTaskItem ||
          isFetchingPricesList ||
          isFetchingClientsList ||
          isFetchingDriversList ||
          isPendingDeleteBatchTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const TasksContextLayout = () => {
  return (
    <TasksProvider>
      <Outlet />
    </TasksProvider>
  );
};
