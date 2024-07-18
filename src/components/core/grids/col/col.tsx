// Packages
import { ReactElement } from 'react';
import { ColProps as ColAntDesignProps } from 'antd/es/grid';

// Styles
import * as Styled from './styles';

export interface ColProps extends ColAntDesignProps {}

export const Col = (props: ColProps): ReactElement => {
  return <Styled.ColContainer {...props} />;
};
