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

// Models
import { Task, TasksToExport, PostTask } from 'models/tasks/tasks';
import { Prices } from 'models/prices/prices';
import { Clients } from 'models/clients/clients';

export interface TasksContextProps {
  id?: string;
  tasksList?: Array<Task>;
  taskItem?: Task;
  pricesList?: Array<Prices>;
  clientsList?: Array<Clients>;
  formatedDataToExport?: Array<TasksToExport>;
  navigate: NavigateFunction;
  createTask: (data: PostTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
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

  // Mutate's
  const { mutateAsync: createTaskMutate, isPending: isPendingPostTask } =
    usePostTask();

  const { mutateAsync: deleteTaskMutate, isPending: isPendingDeleteTask } =
    useDeleteByIdTask();

  const formatedDataToExport = useMemo(() => {
    return tasksList?.map((item) => {
      return {
        NOME: item?.name,
        DOCUMENTO: item?.document,
        PLACA: item?.licensePlate,
        'TOTAL(R$)': item?.total ?? 0,
        SERVIÇOS: item?.services?.map((service) => service?.name).join(', '),
        DATA: moment(item?.createdAt?.seconds * 1000).format('DD/MM/YYYY'),
      };
    });
  }, [tasksList]);

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

  return (
    <TasksContext.Provider
      value={{
        id,
        tasksList,
        taskItem,
        pricesList,
        clientsList,
        formatedDataToExport,
        navigate,
        createTask,
        deleteTask,
        isLoading:
          isPendingDeleteTask ||
          isPendingPostTask ||
          isFetchingTasksList ||
          isFetchingTaskItem ||
          isFetchingPricesList ||
          isFetchingClientsList,
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
