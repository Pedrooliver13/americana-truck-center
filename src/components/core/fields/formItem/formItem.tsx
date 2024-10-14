// Packages
import { ReactElement } from 'react';
import { FormItemProps as FormItemAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface FormItemProps extends FormItemAntDesignProps {}

export const FormItem = (props: FormItemProps): ReactElement => {
  return <Styled.FormItemContainer {...props} />;
};
