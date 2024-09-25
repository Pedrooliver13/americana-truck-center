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

export interface InputPasswordProps extends InputAntDesignProps {
  label?: string;
  className?: string;
}

export const InputPasswordBase = (
  props: InputPasswordProps,
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
      <InputAntDesign.Password
        ref={ref}
        size="large"
        {...props}
        required={false}
      />
    </Styled.InputContainer>
  );
};

export const InputPassword = forwardRef(InputPasswordBase);
