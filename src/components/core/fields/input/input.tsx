// Packages
import React, { ReactElement } from 'react';
import {
  InputRef,
  Input as InputAntDesign,
  InputProps as InputAntDesignProps,
} from 'antd';

// Styles
import * as Styled from './styles';

interface InputProps extends InputAntDesignProps {}

export const InputBase = (
  props: InputProps,
  ref: React.LegacyRef<InputRef> | undefined
): ReactElement => {
  return (
    <Styled.InputContainer>
      <InputAntDesign ref={ref} size="large" {...props} />
    </Styled.InputContainer>
  );
};

export const Input = React.forwardRef(InputBase);
