// Packages
import { ReactElement } from 'react';
import { RowProps as RowAntDesignProps } from 'antd/es/grid';

// Styles
import * as Styled from './styles';

export interface RowProps extends RowAntDesignProps {}

export const Row = (props: RowProps): ReactElement => {
  return <Styled.RowContainer {...props} />;
};
