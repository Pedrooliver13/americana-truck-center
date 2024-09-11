// Packages
import { ReactElement } from 'react';
import { Empty } from 'antd';
import type { TableProps as TableAntDesignProps } from 'antd';

// Components
import { Skeleton } from 'components/core';

// Styles
import * as Styled from './styles';

interface TableProps extends TableAntDesignProps {
  isLoading?: boolean;
  minHeight?: string;
}

export const Table = (props: TableProps): ReactElement => {
  return (
    <Styled.TableAntDesign
      {...props}
      size="small"
      loading={props?.isLoading}
      locale={{
        emptyText: () => {
          return props?.isLoading ? (
            <Skeleton active />
          ) : (
            <Empty
              style={{
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: '100%',
                width: '100%',
                flex: 1,
              }}
            />
          );
        },
      }}
      pagination={props?.pagination}
    />
  );
};
