// Packages
import { ReactElement, forwardRef } from 'react';
import { RadioGroupProps as RadioGroupAntDesignProps, Typography } from 'antd';

// Styles
import * as Styled from './styles';

export interface RadioGroupProps extends RadioGroupAntDesignProps {
  label?: string;
  required?: boolean;
}

const RadioGroupBase = (
  props: RadioGroupProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any
): ReactElement => {
  return (
    <>
      {props.label && (
        <Typography.Title level={5}>
          {props.label} {props?.required && '*'}
        </Typography.Title>
      )}

      <Styled.RadioGroupContainer ref={ref} {...props}>
        {props.children}
      </Styled.RadioGroupContainer>
    </>
  );
};

export const RadioGroup = forwardRef(RadioGroupBase);
