// Packages
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RadioChangeEvent } from 'antd';

type RadioList = Array<{
  id: string;
  name: string;
  value?: number;
  minValue: string;
  maxValue: string;
}>;

interface UseTasksCountReturn {
  totalPrice: number;
  totalItems: number;
  listServices: RadioList;
  setServicesSelectedList: (state: RadioList) => void;
  handleChangeAddNewServiceInList: (
    e: RadioChangeEvent,
    serviceItem: {
      id: string;
      name: string;
      minValue: string;
      maxValue: string;
    }
  ) => void;
}

export const useTasksCount = (serviceList: RadioList): UseTasksCountReturn => {
  const [servicesSelectedList, setServicesSelectedList] =
    useState<RadioList>(serviceList);

  const pricesSelectedList = servicesSelectedList.map((item) =>
    Number(item?.value)
  );

  const totalPrice = useMemo(
    () =>
      pricesSelectedList.reduce(
        (acc: number, field: number) => (field ? acc + Number(field) : acc),
        0
      ),
    [pricesSelectedList]
  );

  const totalItems = useMemo(
    () => pricesSelectedList.filter((field: number) => field > 0).length,
    [pricesSelectedList]
  );

  const handleChangeAddNewServiceInList = useCallback(
    (
      e: RadioChangeEvent,
      serviceItem: {
        id: string;
        name: string;
        minValue: string;
        maxValue: string;
      }
    ) => {
      setServicesSelectedList((state: RadioList) => {
        if (!Array.isArray(state)) {
          return [];
        }

        const alreadyServiceSelected = state?.find(
          (item) => String(item?.id) === String(serviceItem?.id)
        );

        if (e.target.value === '0') {
          return state.filter(
            (item) => String(item.id) !== String(serviceItem?.id)
          );
        }

        // ? Para não adicionar duplicado na conta
        if (alreadyServiceSelected) {
          return state.map((item) => {
            if (String(item.id) !== String(serviceItem?.id)) {
              return item;
            }

            return { ...item, value: e.target.value };
          });
        }

        return [...state, { ...serviceItem, value: e.target.value }];
      });
    },
    []
  );

  useEffect(() => {
    if (Array.isArray(serviceList) && serviceList.length > 0) {
      setServicesSelectedList(serviceList);
    }
  }, [serviceList]);

  return {
    totalPrice,
    totalItems,
    listServices: servicesSelectedList,
    setServicesSelectedList,
    handleChangeAddNewServiceInList,
  };
};
