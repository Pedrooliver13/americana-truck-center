// Packages
import { ReactElement, forwardRef } from 'react';
import {
  InputRef,
  Typography,
  Input as InputAntDesign,
  InputProps as InputAntDesignProps,
} from 'antd';

// Styles
import * as Styled from './styles';

export interface InputProps extends InputAntDesignProps {
  label?: string;
  className?: string;
}

export const InputBase = (
  props: InputProps,
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
      <InputAntDesign ref={ref} size="large" {...props} required={false} />
    </Styled.InputContainer>
  );
};

export const Input = forwardRef(InputBase);
