// Packages
import { ReactElement, ReactNode } from 'react';
import { RadioProps as RadioAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

export interface RadioProps extends RadioAntDesignProps {
  children?: ReactNode;
}

export const Radio = (props: RadioProps): ReactElement => {
  return <Styled.RadioContainer {...props} />;
};
