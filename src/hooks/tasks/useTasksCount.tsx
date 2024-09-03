// Packages
import { useMemo } from 'react';
import { UseFormWatch } from 'react-hook-form';

type RadioList = Array<{
  name: string;
  label: string;
  visualValue: string;
  completeValue: string;
}>;

interface UseTasksCountProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<T | any>;
  radioList: RadioList;
}

export const useTasksCount = <T,>({
  watch,
  radioList,
}: UseTasksCountProps<T>): {
  totalPrice: number;
  totalItems: number;
  listSelected: Array<{ label: string; value: number }>;
} => {
  const fields = watch(radioList.map((item) => item.name));

  const totalPrice = useMemo(
    () =>
      fields.reduce(
        (acc: number, field: number) => (field ? acc + Number(field) : acc),
        0
      ),
    [fields]
  );

  const totalItems = useMemo(
    () => fields.filter((field: number) => field > 0).length,
    [fields]
  );

  const listSelected = useMemo(
    () =>
      radioList
        .map((item, index) => {
          const currentValue = fields[index];
          const isSelected = currentValue ? currentValue > 0 : false;

          return isSelected
            ? { label: item?.label, value: Number(currentValue) }
            : undefined;
        })
        .filter(Boolean),
    [fields, radioList]
  ) as Array<{ label: string; value: number }>;

  return {
    totalPrice,
    totalItems,
    listSelected,
  };
};
