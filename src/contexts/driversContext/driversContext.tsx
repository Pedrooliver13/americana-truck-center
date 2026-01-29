// Packages
import {
  ReactElement,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  NavigateFunction,
  useNavigate,
  Outlet,
  useParams,
} from 'react-router-dom';

// Hooks
import { useGetAllDrivers } from 'hooks/drivers/useGetAllDrivers';
import { usePostDriver } from 'hooks/drivers/usePostDriver';
import { usePutDriver } from 'hooks/drivers/usePutDriver';
import { useDeleteDriverById } from 'hooks/drivers/useDeleteDriverById';
import { useGetByIdDriver } from 'hooks/drivers/useGetDriverById';

// Models
import {
  Drivers,
  DriversToExport,
  PostDriver,
  PutDriver,
} from 'models/drivers/drivers';

export interface DriversContextProps {
  id?: string;
  driversList?: Array<Drivers>;
  driverItem?: Drivers;
  formatedDataToExport?: Array<DriversToExport>;

  createDriver: (data: PostDriver) => void;
  updateDriver: (data: PutDriver) => void;
  deleteDriver: (id: string) => void;
  onToggleModal: () => void;
  navigate: NavigateFunction;

  isOpenModal: boolean;
  isLoading: boolean;
}

interface DriversProviderProps {
  children: React.ReactNode;
}

export const DriversContext = createContext({} as DriversContextProps);

export const DriversProvider = ({
  children,
}: DriversProviderProps): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: driversList, isFetching: isFetchingDriverList } =
    useGetAllDrivers(id);

  const { data: driverItem, isFetching: isFetchingDriverItem } =
    useGetByIdDriver(id);

  const { mutateAsync: createDriverPostMutate, isPending: isPendingPost } =
    usePostDriver();

  const { mutateAsync: updateDriverMutate, isPending: isPendingPut } =
    usePutDriver();

  const { mutateAsync: deleteDriverMutate, isPending: isPendingDelete } =
    useDeleteDriverById();

  const formatedDataToExport = useMemo(() => {
    if (!Array?.isArray(driversList)) {
      return [];
    }

    return driversList?.map((item) => {
      return {
        NOME: item?.name,
        DOCUMENTO: item?.document,
        CONTATO: item?.phone ?? '',

        /* Change email label to "Empresa"(customer request)  */
        EMPRESA: item?.email ?? '',
      };
    });
  }, [driversList]);

  const createDriver = useCallback(
    async (data: PostDriver): Promise<void> => {
      const payload = data;

      createDriverPostMutate(payload);
    },
    [createDriverPostMutate]
  );

  const updateDriver = useCallback(
    async (data: PutDriver): Promise<void> => {
      const payload = data;

      updateDriverMutate(payload);
    },
    [updateDriverMutate]
  );

  const deleteDriver = useCallback(
    (id: string) => {
      deleteDriverMutate(id);
    },
    [deleteDriverMutate]
  );

  const onToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <DriversContext.Provider
      value={{
        id,
        driversList: driversList ?? [],
        driverItem,
        formatedDataToExport,
        createDriver,
        updateDriver,
        deleteDriver,
        onToggleModal,
        navigate,
        isOpenModal,
        isLoading:
          isPendingPost ||
          isPendingPut ||
          isPendingDelete ||
          isFetchingDriverList ||
          isFetchingDriverItem,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
};

export const DriverContextLayout = () => {
  return (
    <DriversProvider>
      <Outlet />
    </DriversProvider>
  );
};
