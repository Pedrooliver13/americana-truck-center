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
import { useGetAllReports } from 'hooks/reports/useGetAllReports';
import { usePostReport } from 'hooks/reports/usePostReport';
import { useDeleteReportById } from 'hooks/reports/useDeleteReportById';
import { useGetAllClients } from 'hooks/clients/useGetAllClients';
import { useGetAllDrivers } from 'hooks/drivers/useGetAllDrivers';
import { useGetByIdReport } from 'hooks/reports/useGetByIdReport';
import { usePutReport } from 'hooks/reports/usePutReport';

// Models
import { Clients } from 'models/clients/clients';
import { Drivers } from 'models/drivers/drivers';
import {
  PostReport,
  ReportsToExport,
  Report,
  PutReport,
} from 'models/reports/reports';

export interface ReportsContextProps {
  id?: string;
  reportsList?: Array<Report>;
  reportItem?: Report;
  priceItem?: Report;
  clientsListOptions: Array<Clients>;
  driverListOptions: Array<Drivers>;
  formatedDataToExport?: Array<ReportsToExport>;

  createReport: (data: PostReport) => void;
  updateReport: (data: PutReport) => void;
  deleteReport: (id: string) => void;
  onToggleModal: () => void;
  navigate: NavigateFunction;

  isOpenModal: boolean;
  isLoading: boolean;
}

interface ReportsProviderProps {
  children: React.ReactNode;
}

export const ReportsContext = createContext({} as ReportsContextProps);

export const ReportsProvider = ({
  children,
}: ReportsProviderProps): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: reportsList, isFetching: isFetchingReportList } =
    useGetAllReports(id);

  const { data: reportItem, isFetching: isFetchingReportItem } =
    useGetByIdReport(id);

  const { data: clientsList, isFetching: isFetchingClientsList } =
    useGetAllClients(id);

  const { data: driversList, isFetching: isFetchingDriversList } =
    useGetAllDrivers(id);

  const { mutateAsync: createReportPostMutate, isPending: isPendingPost } =
    usePostReport();

  const { mutateAsync: updateReportPutMutate, isPending: isPendingPut } =
    usePutReport();

  const { mutateAsync: deleteReportMutate, isPending: isPendingDelete } =
    useDeleteReportById();

  const formatedDataToExport = useMemo(() => {
    if (!Array?.isArray(reportsList)) {
      return [];
    }

    return reportsList
      ?.filter((item) => item?.id)
      .map((item) => {
        return {
          ID: item?.id as string,
          'RAZÃO SOCIAL': item?.socialName,
          'ID DO LAUDO': item?.reportId as string,
        };
      });
  }, [reportsList]);

  const clientsListOptions = useMemo(() => {
    if (!Array?.isArray(clientsList)) {
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

  const createReport = useCallback(
    async (data: PostReport): Promise<void> => {
      const payload = {
        ...data,
      };

      createReportPostMutate(payload);
    },
    [createReportPostMutate],
  );

  const updateReport = useCallback(
    async (data: PutReport): Promise<void> => {
      const payload = {
        ...data,
      };

      await updateReportPutMutate(payload);
    },
    [updateReportPutMutate],
  );

  const deleteReport = useCallback(
    (id: string) => {
      deleteReportMutate(id);
    },
    [deleteReportMutate],
  );

  const onToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <ReportsContext.Provider
      value={{
        id,
        reportsList: reportsList ?? [],
        reportItem: reportItem,
        clientsListOptions,
        driverListOptions,
        formatedDataToExport,
        createReport,
        updateReport,
        deleteReport,
        onToggleModal,
        navigate,
        isOpenModal,
        isLoading:
          isPendingPost ||
          isPendingPut ||
          isPendingDelete ||
          isFetchingReportList ||
          isFetchingClientsList ||
          isFetchingDriversList ||
          isFetchingReportItem,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const ReportContextLayout = () => {
  return (
    <ReportsProvider>
      <Outlet />
    </ReportsProvider>
  );
};
