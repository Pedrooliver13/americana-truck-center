// Packages
import {  ReactElement } from 'react';
import {
  CheckboxOptionType,
  Checkbox as CheckBoxAntDesign,
  CheckboxProps as CheckBoxAntDesignProps,
} from 'antd';

interface CheckboxGroupProps extends CheckBoxAntDesignProps {
  options?: CheckboxOptionType[] | Array<void>;
}

export const CheckboxGroup = (props: CheckboxGroupProps): ReactElement => {
  return <CheckBoxAntDesign {...props} />;
};
