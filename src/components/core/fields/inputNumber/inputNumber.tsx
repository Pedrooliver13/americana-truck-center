import { Input } from '../input/input';

// Packages
import { ReactElement, forwardRef } from 'react';
import { InputRef, Typography } from 'antd';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

// Styles
import * as Styled from './styles';

export interface InputBaseProps extends NumberFormatProps {
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const InputBase = (
  props: InputBaseProps,
  ref: React.LegacyRef<InputRef> | undefined
): ReactElement => {
  return (
    <Styled.InputContainer>
      {props.label && (
        <Typography.Title
          level={5}
          className="label"
          disabled={props?.disabled}
        >
          {props.label} {props?.required && '*'}
        </Typography.Title>
      )}
      <NumberFormat
        getInputRef={(el: InputRef | null) => {
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref && typeof ref === 'object') {
            (ref as React.MutableRefObject<InputRef>).current = el!;
          }
        }}
        {...props}
        size="large"
        label=""
        id={props?.id}
        name={props?.name}
        prefix="R$"
        customInput={Input}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        disabled={props?.disabled}
        required={false}
      />
    </Styled.InputContainer>
  );
};

export const InputNumber = forwardRef(InputBase);
