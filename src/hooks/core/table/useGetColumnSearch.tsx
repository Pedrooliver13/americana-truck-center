// Packages
import { ChangeEvent, useRef, useState } from 'react';
import { Space, type InputRef, type TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { SearchOutlined as SearchOutlinedIcon } from '@ant-design/icons';
import moment from 'moment';

// Components
import { Button, Input } from 'components/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataType = Record<string, any>;
type DataIndex<T> = Extract<keyof T, string>;

export const useGetColumnSearch = <T extends DataType>() => {
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm']
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex<T>,
    columnName?: string
  ): TableColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{ padding: 8, maxWidth: 280, width: '100%' }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          id={`table-search-input-${dataIndex}`}
          placeholder={`Buscar por ${columnName ? columnName : dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSelectedKeys(e?.target?.value ? [e?.target?.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlinedIcon />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlinedIcon style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (!record[dataIndex]) {
        return false;
      }

      if (dataIndex === 'createdAt') {
        return moment(record[dataIndex]?.seconds * 1000)
          .format('DD/MM/YYYY HH:mm')
          .includes(value as string);
      }

      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => {
      if (dataIndex === 'createdAt') {
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={
              text
                ? moment(text?.seconds * 1000).format('DD/MM/YYYY HH:mm')
                : '-'
            }
          />
        );
      }

      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : '-'}
        />
      );
    },
  });

  return {
    getColumnSearchProps,
  };
};
