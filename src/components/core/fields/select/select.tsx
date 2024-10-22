// Packages
import { ReactElement, forwardRef } from 'react';
import {
  Typography,
  Select as SelectAntDesign,
  SelectProps as SelectAntDesignProps,
} from 'antd';

// Styles
import * as Styled from './styles';

export interface BaseSelectRef {
  focus: (options?: FocusOptions) => void;
  blur: () => void;
  nativeElement: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollTo: any;
}

interface SelectProps extends SelectAntDesignProps {
  label?: string;
  required?: boolean;
}

const SelectBase = (
  props: SelectProps,
  ref: React.LegacyRef<BaseSelectRef> | undefined
): ReactElement => {
  return (
    <Styled.SelectContainer>
      {props.label && (
        <label htmlFor={props.id}>
          <Typography.Title level={5}>
            {props.label} {props?.required && '*'}
          </Typography.Title>
        </label>
      )}
      <SelectAntDesign ref={ref} size="large" {...props} />
    </Styled.SelectContainer>
  );
};

export const Select = forwardRef(SelectBase);
