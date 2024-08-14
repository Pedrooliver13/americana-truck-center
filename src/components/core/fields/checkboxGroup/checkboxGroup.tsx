// Packages
import { ReactElement } from 'react';
import {
  CheckboxOptionType,
  Checkbox as CheckBoxAntDesign,
  CheckboxProps as CheckBoxAntDesignProps,
} from 'antd';

interface CheckboxGroupProps extends CheckBoxAntDesignProps {
  options?: Array<{ id: string; value: string } | void | CheckboxOptionType>;
  onChange?: (
    checkedValue: Array<{ id: string; value: string } | void>
  ) => void;
}

export const CheckboxGroup = (props: CheckboxGroupProps): ReactElement => {
  return <CheckBoxAntDesign.Group {...props} />;
};
