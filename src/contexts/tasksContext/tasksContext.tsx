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

// Models
import { Task, TasksToExport, PostTask } from 'models/tasks/tasks';
import { Prices } from 'models/prices/prices';

export interface TasksContextProps {
  id?: string;
  tasksList?: Array<Task>;
  taskItem?: Task;
  pricesList?: Array<Prices>;
  formatedDataToExport?: Array<TasksToExport>;
  navigate: NavigateFunction;
  createTask: (data: PostTask) => Promise<void>;
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

  const { data: tasksList, isFetching: isFetchingTasksList } =
    useGetAllTasks(id);

  const { data: taskItem, isFetching: isFetchingTaskItem } = useGetByIdTask(id);

  const { data: pricesList, isFetching: isFetchingPricesList } =
    useGetAllPrices(id);

  const { mutateAsync: createTaskMutate, isPending: isPendingPostTask } =
    usePostTask();

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

  return (
    <TasksContext.Provider
      value={{
        id,
        tasksList,
        taskItem,
        pricesList,
        formatedDataToExport,
        navigate,
        createTask,
        isLoading:
          isPendingPostTask ||
          isFetchingTasksList ||
          isFetchingTaskItem ||
          isFetchingPricesList,
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
