/* eslint-disable @typescript-eslint/no-explicit-any */

// Packages
import { useState } from 'react';

interface UseGetHiddenColumnsProps {
  columns: any[];
  defaultCheckedList?: string[];
}

export const useGetHiddenColumns = (
  props: UseGetHiddenColumnsProps
): {
  checkedList: any[];
  setCheckedList: (value: string[]) => void;
  options: { label: string; value: string }[];
  newColumns: { [key: string]: string | boolean }[];
} => {
  const defaultCheckedList = props?.columns.map((item) => item?.key as string);
  const [checkedList, setCheckedList] = useState(
    props?.defaultCheckedList || defaultCheckedList
  );

  if (!props?.columns) {
    return {
      checkedList: [],
      setCheckedList: () => {},
      options: [],
      newColumns: [],
    };
  }

  const options = props?.columns.map(({ key, title }, index) => ({
    id: `${key}${index}`,
    label: title,
    value: key,
  }));

  const newColumns = props?.columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item?.key as string),
  }));

  return { checkedList, setCheckedList, options, newColumns };
};
