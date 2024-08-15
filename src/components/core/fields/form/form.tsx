// Packages
import { ReactElement } from 'react';
import { FormProps as FormAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface FormProps extends FormAntDesignProps {}

export const Form = (props: FormProps): ReactElement => {
  return <Styled.FormContainer {...props} />;
};
