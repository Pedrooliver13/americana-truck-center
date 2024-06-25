// Packages
import React, { ReactElement, InputHTMLAttributes } from 'react';
import {
  InputRef,
  Input as InputAntDesign,
  InputProps as InputAntDesignProps,
} from 'antd';

// Styles
import * as Styled from './styles';

type InputAntDesignProp = InputAntDesignProps &
  InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends InputAntDesignProp {
  error?: string | undefined;
}

export const InputBase = (
  props: InputProps,
  ref: React.LegacyRef<InputRef> | undefined
): ReactElement => {
  return (
    <Styled.InputContainer>
      <InputAntDesign ref={ref} size="large" {...props} />
      {props?.error && <span className="input-error">{props.error}</span>}
    </Styled.InputContainer>
  );
};

export const Input = React.forwardRef(InputBase);
