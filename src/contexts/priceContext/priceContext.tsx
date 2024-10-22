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

// Models
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
        'VALOR VISUAL': priceFormatter.format(Number(item?.minValue)),
        'VALOR COMPLETO': priceFormatter.format(Number(item?.maxValue)),
      };
    });
  }, [pricesList]);

  const createPrice = useCallback(
    async (data: PostPrice): Promise<void> => {
      const payload = {
        ...data,
        minValue: convertCurrencyToNumber(String(data?.minValue)),
        maxValue: convertCurrencyToNumber(String(data?.maxValue)),
      };

      createPricePostMutate(payload);
    },
    [createPricePostMutate]
  );

  const updatePrice = useCallback(
    async (data: PutPrice): Promise<void> => {
      const payload = {
        ...data,
        minValue: convertCurrencyToNumber(String(data?.minValue)),
        maxValue: convertCurrencyToNumber(String(data?.maxValue)),
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
          isFetchingPriceItem,
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
