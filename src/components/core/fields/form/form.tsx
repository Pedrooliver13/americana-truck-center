// Packages
import { forwardRef, ReactElement } from 'react';
import { FormProps as FormAntDesignProps, FormInstance } from 'antd';

// Styles
import * as Styled from './styles';

interface FormProps extends FormAntDesignProps {}

export const FormBase = (
  props: FormProps,
  ref:
    | ((instance: FormInstance | null) => void)
    | React.RefObject<FormInstance>
    | null
    | undefined
): ReactElement => {
  return <Styled.FormContainer {...props} ref={ref} />;
};

export const Form = forwardRef<FormInstance, FormProps>(FormBase);
