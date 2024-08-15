// Packages
import { ReactElement } from 'react';
import { TooltipProps as TooltipAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

type TooltipProps = TooltipAntDesignProps;

export const Tooltip = (props: TooltipProps): ReactElement => {
  return <Styled.TooltipContainer {...props} />;
};
