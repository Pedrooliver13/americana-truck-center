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
import { useGetAllPrices } from 'hooks/prices/useGetAllPrices';
import { usePostPrice } from 'hooks/prices/usePostPrice';
import { usePutPrice } from 'hooks/prices/usePutPrice';
import { useDeletePriceById } from 'hooks/prices/useDeletePriceById';
import { useGetByIdPrice } from 'hooks/prices/useGetPriceById';
import { useGetAllClients } from 'hooks/clients/useGetAllClients';

// Models
import { Clients } from 'models/clients/clients';
import {
  Prices,
  PricesToExport,
  PostPrice,
  PutPrice,
} from 'models/prices/prices';

// Utils
import { convertCurrencyToNumber, priceFormatter } from 'utils/formatter';

export interface PricesContextProps {
  id?: string;
  pricesList?: Array<Prices>;
  priceItem?: Prices;
  clientsListOptions: Array<Clients>;
  formatedDataToExport?: Array<PricesToExport>;

  createPrice: (data: PostPrice) => void;
  updatePrice: (data: PutPrice) => void;
  deletePrice: (id: string) => void;
  onToggleModal: () => void;
  navigate: NavigateFunction;

  isOpenModal: boolean;
  isLoading: boolean;
}

interface PricesProviderProps {
  children: React.ReactNode;
}

export const PricesContext = createContext({} as PricesContextProps);

export const PricesProvider = ({
  children,
}: PricesProviderProps): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: pricesList, isFetching: isFetchingPriceList } =
    useGetAllPrices(id);

  const { data: priceItem, isFetching: isFetchingPriceItem } =
    useGetByIdPrice(id);

  const { data: clientsList, isFetching: isFetchingClientsList } =
    useGetAllClients(id);

  const { mutateAsync: createPricePostMutate, isPending: isPendingPost } =
    usePostPrice();

  const { mutateAsync: updatePriceMutate, isPending: isPendingPut } =
    usePutPrice();

  const { mutateAsync: deletePriceMutate, isPending: isPendingDelete } =
    useDeletePriceById();

  const formatedDataToExport = useMemo(() => {
    if (!Array?.isArray(pricesList)) {
      return [];
    }

    return pricesList?.map((item) => {
      return {
        NOME: item?.name,
        TIPO: item?.type,
        VALOR: priceFormatter.format(Number(item?.value)),
      };
    });
  }, [pricesList]);

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

  const createPrice = useCallback(
    async (data: PostPrice): Promise<void> => {
      const payload = {
        ...data,
        value: convertCurrencyToNumber(String(data?.value)),
      };

      createPricePostMutate(payload);
    },
    [createPricePostMutate]
  );

  const updatePrice = useCallback(
    async (data: PutPrice): Promise<void> => {
      const payload = {
        ...data,
        value: convertCurrencyToNumber(String(data?.value)),
      };

      updatePriceMutate(payload);
    },
    [updatePriceMutate]
  );

  const deletePrice = useCallback(
    (id: string) => {
      deletePriceMutate(id);
    },
    [deletePriceMutate]
  );

  const onToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <PricesContext.Provider
      value={{
        id,
        pricesList: pricesList ?? [],
        priceItem: priceItem,
        clientsListOptions,
        formatedDataToExport,
        createPrice,
        updatePrice,
        deletePrice,
        onToggleModal,
        navigate,
        isOpenModal,
        isLoading:
          isPendingPost ||
          isPendingPut ||
          isPendingDelete ||
          isFetchingPriceList ||
          isFetchingPriceItem ||
          isFetchingClientsList,
      }}
    >
      {children}
    </PricesContext.Provider>
  );
};

export const PriceContextLayout = () => {
  return (
    <PricesProvider>
      <Outlet />
    </PricesProvider>
  );
};
