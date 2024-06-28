// Packages
import { ReactElement } from 'react';
import { ButtonProps as ButtonAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface ButtonProps extends ButtonAntDesignProps {}

export const Button = (props: ButtonProps): ReactElement => {
  return (
    <Styled.ButtonContainer {...props}>{props.children}</Styled.ButtonContainer>
  );
};
