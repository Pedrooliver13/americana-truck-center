// Packages
import { forwardRef, ReactElement, ReactNode } from 'react';
import { CardProps as CardAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

interface CardProps extends CardAntDesignProps {
  children: ReactNode;
}

export const CardBase = (
  props: CardProps,
  ref:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
): ReactElement => {
  const { theme } = useGlobalContext();

  return <Styled.CardContainer $currentTheme={theme} {...props} ref={ref} />;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(CardBase);
