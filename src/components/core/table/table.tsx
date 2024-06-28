// Packages
import { ReactElement } from 'react';
import type { TableProps as TableAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface TableProps extends TableAntDesignProps {}

export const Table = (props: TableProps): ReactElement => {
  return (
    <Styled.TableAntDesign
      {...props}
      pagination={{
        ...props?.pagination,
        locale: {
          items_per_page: '/ página',
          jump_to: 'Ir para',
          jump_to_confirm: 'confirmar',
          page: '',
        },
      }}
    />
  );
};
