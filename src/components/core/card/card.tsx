// Packages
import { ReactElement, ReactNode } from 'react';
import { CardProps as CardAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface CardProps extends CardAntDesignProps {
  children: ReactNode;
}

export const Card = (props: CardProps): ReactElement => {
  return <Styled.CardContainer {...props} />;
};
