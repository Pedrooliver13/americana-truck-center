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

// Models
import { Clients } from 'models/clients/clients';
import { PostReport, ReportsToExport, Report } from 'models/reports/reports';

export interface ReportsContextProps {
  id?: string;
  reportsList?: Array<Report>;
  priceItem?: Report;
  clientsListOptions: Array<Clients>;
  formatedDataToExport?: Array<ReportsToExport>;

  createReport: (data: PostReport) => void;
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

  const { data: clientsList, isFetching: isFetchingClientsList } =
    useGetAllClients(id);

  const { mutateAsync: createReportPostMutate, isPending: isPendingPost } =
    usePostReport();

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

  const createReport = useCallback(
    async (data: PostReport): Promise<void> => {
      const payload = {
        ...data,
      };

      createReportPostMutate(payload);
    },
    [createReportPostMutate]
  );

  const deleteReport = useCallback(
    (id: string) => {
      deleteReportMutate(id);
    },
    [deleteReportMutate]
  );

  const onToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <ReportsContext.Provider
      value={{
        id,
        reportsList: reportsList ?? [],
        clientsListOptions,
        formatedDataToExport,
        createReport,
        deleteReport,
        onToggleModal,
        navigate,
        isOpenModal,
        isLoading:
          isPendingPost ||
          isPendingDelete ||
          isFetchingReportList ||
          isFetchingClientsList,
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
