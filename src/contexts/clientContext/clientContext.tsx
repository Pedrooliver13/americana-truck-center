// Packages
import { ReactElement, createContext, useMemo } from 'react';
import {
  NavigateFunction,
  useNavigate,
  Outlet,
  useParams,
} from 'react-router-dom';

// Hooks
import { useGetAllClients } from 'hooks/clients/useGetAllClients';
import { usePostClient } from 'hooks/clients/usePostClient';
import { useDeleteClientById } from 'hooks/clients/useDeleteClientById';
import { useGetAllTasks } from 'hooks/tasks/useGetAllTasks';
import { useGetByIdClient } from 'hooks/clients/useGetClientById';

// Models
import { Clients, ClientsToExport, PostClient } from 'models/clients/clients';
import { Task } from 'models/tasks/tasks';

export interface ClientsContextProps {
  id?: string;
  clientsList?: Array<Clients>;
  clientItem?: Clients;
  tasksList?: Array<Task>;
  formatedDataToExport: Array<ClientsToExport>;
  createClient: (data: PostClient) => void;
  deleteClient: (id: string) => void;
  navigate: NavigateFunction;
  isLoading: boolean;
}

interface ClientsProviderProps {
  children: React.ReactNode;
}

export const ClientsContext = createContext({} as ClientsContextProps);

export const ClientsProvider = ({
  children,
}: ClientsProviderProps): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: clientsList, isFetching: isFetchingClientsList } =
    useGetAllClients(id);

  const { data: clientItem, isFetching: isFetchingClientItem } =
    useGetByIdClient(id);

  const { data: tasksList, isFetching: isFetchingTasksList } =
    useGetAllTasks(id);

  const { mutateAsync: createClientMutate, isPending: isPendingPostClient } =
    usePostClient();

  const { mutateAsync: deleteClientMutate, isPending: isPendingDeleteClient } =
    useDeleteClientById();

  const formatedDataToExport = useMemo(() => {
    if (!Array?.isArray(clientsList)) {
      return [];
    }

    return clientsList?.map((item) => {
      return {
        NOME: item?.name,
        DOCUMENTO: item?.document,
        CELULAR: item?.phone,
        EMAIL: item?.email,
      };
    });
  }, [clientsList]);

  const createClient = (data: PostClient) => {
    createClientMutate(data);
  };

  const deleteClient = (id: string) => {
    deleteClientMutate(id);
  };

  return (
    <ClientsContext.Provider
      value={{
        id,
        clientsList,
        clientItem,
        tasksList,
        formatedDataToExport,
        createClient,
        deleteClient,
        navigate,
        isLoading:
          isPendingDeleteClient ||
          isPendingPostClient ||
          isFetchingClientsList ||
          isFetchingTasksList ||
          isFetchingClientItem,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const ClientsContextLayout = () => {
  return (
    <ClientsProvider>
      <Outlet />
    </ClientsProvider>
  );
};
