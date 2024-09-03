// Packages
import { ReactElement, useState } from 'react';
import { TableColumnsType, notification } from 'antd';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button, Input, Modal, Select, Table, Tag } from 'components/core';

// Hooks
import { useGetColumnSearch, useGetHiddenColumns } from 'hooks/core';

// Utils
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

interface DataType {
  id: string;
  service: string;
  price: number;
}

const data: DataType[] = Array(90)
  .fill(null)
  .map((_, index) => ({
    id: `${index}`,
    service: 'Lubrificação',
    price: 100,
  }));

export const Prices = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getColumnSearchProps } = useGetColumnSearch<DataType>();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Serviços',
      dataIndex: 'service',
      key: 'service',
      ...getColumnSearchProps('service', 'Serviços'),
    },
    {
      title: 'Preços',
      dataIndex: 'price',
      key: 'price',
      ...getColumnSearchProps('price', 'Preços'),
      render: (value) => (
        <Tag color="green">{priceFormatter.format(value)}</Tag>
      ),
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: '100px',
      render: () => (
        <div className="table__actions">
          <Button
            type="text"
            icon={<EditOutlinedIcon color="#2B3034" />}
            size="small"
          />
          <Button
            danger
            icon={<DeleteOutlinedIcon />}
            type="text"
            size="small"
            onClick={handleToggleModal}
          />
        </div>
      ),
    },
  ];

  const { newColumns, options, checkedList, setCheckedList } =
    useGetHiddenColumns({
      columns,
      defaultCheckedList: ['service', 'price', 'actions'],
    });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <Styled.PriceContainer className="container">
      <header className="prices__header">
        <h1>Preços</h1>
      </header>

      <div className="prices__actions">
        <div className="prices__actions--search">
          <Input
            id="price-search"
            size="large"
            placeholder="Pesquisar"
            allowClear
            autoComplete="off"
          />
          <Button type="primary" size="large" icon={<SearchOutlinedIcon />}>
            Buscar
          </Button>
        </div>

        <div>
          <Select
            id="select-columns"
            mode="tags"
            showSearch={false}
            value={checkedList}
            placeholder="Colunas"
            options={options}
            maxTagPlaceholder="Colunas"
            maxTagCount={0}
            dropdownStyle={{ width: '250px' }}
            onChange={(value) => {
              setCheckedList(value as string[]);
            }}
          />
        </div>
      </div>

      <Table
        id="prices-table"
        rowKey="id"
        data-cy="prices-table"
        columns={newColumns}
        dataSource={data}
        size="small"
        bordered
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
        }}
      />

      <Modal
        title="Desejar excluir o serviço?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          notification.success({
            message: 'Serviço excluído com sucesso!',
          });
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>
          Tem certeza que deseja excluir este registro? Após excluído essa ação
          não poderá ser desfeita!
        </p>
      </Modal>
    </Styled.PriceContainer>
  );
};
