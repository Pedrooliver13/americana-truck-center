// Packages
import { useMemo } from 'react';

interface UseGetMaskProps {
  mask: {
    mask: string;
    lazy: boolean;
  }[];
}

export const useGetMask = (props: UseGetMaskProps) => {
  const mask = useMemo(() => props.mask, [props.mask]);
  return { mask };
};
