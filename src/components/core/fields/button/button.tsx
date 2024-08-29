// Packages
import { ReactElement, forwardRef } from 'react';
import { ButtonProps as ButtonAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface ButtonProps extends ButtonAntDesignProps {}

const ButtonBase = (
  props: ButtonProps,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined
): ReactElement => {
  return (
    <Styled.ButtonContainer {...props} ref={ref}>
      {props.children}
    </Styled.ButtonContainer>
  );
};

export const Button = forwardRef(ButtonBase);
