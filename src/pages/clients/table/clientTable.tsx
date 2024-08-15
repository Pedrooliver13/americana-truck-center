// Packages
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { TableColumnsType, notification } from 'antd';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Table, Button, Modal, Input, Select } from 'components/core';

// Hooks
import { useGetColumnSearch, useGetHiddenColumns } from 'hooks/core';

// Styles
import * as Styled from './styles';

interface DataType {
  id: string;
  name: string;
  registrationNumber: string | number;
  date: string;
  status: number;
}

const data: DataType[] = Array(90)
  .fill(null)
  .map((_, index) => ({
    id: `${index}`,
    name: 'John Brown',
    registrationNumber: '638.822.570-59',
    vehicle: index % 2 === 0 ? 'Mercedez Bens' : 'BMW',
    total: index % 2 === 0 ? 1000 : 3000,
    date: index % 2 === 0 ? '27/06/2024' : '10/10/2021',
    status: 1,
  }));

export const ClientTable = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getColumnSearchProps } = useGetColumnSearch<DataType>();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name', 'Nome'),
    },
    {
      title: 'Documento',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
      responsive: ['md'],
      ...getColumnSearchProps('registrationNumber', 'Documento'),
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      responsive: ['md'],
      ...getColumnSearchProps('date', 'Data'),
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
            className="table__actions--normal"
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
      defaultCheckedList: ['name', 'registrationNumber', 'date', 'actions'],
    });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <Styled.ClientTableContainer className="container">
      <header className="clients__header">
        <h1>Clientes</h1>

        <Link to="/clients/new">
          <Button size="large" type="primary">
            Adicionar Cliente
          </Button>
        </Link>
      </header>

      <div className="clients__actions">
        <div className="clients__actions--search">
          <Input
            id="client-search"
            size="large"
            placeholder="Pesquisar"
            allowClear
            autoComplete="off"
          />
          <Button type="primary" size="large" icon={<SearchOutlinedIcon />}>
            Buscar
          </Button>
        </div>

        <div className="clients__actions--columns">
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
        id="clients-table"
        rowKey="id"
        data-cy="clients-table"
        columns={newColumns}
        dataSource={data}
        size="small"
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
        }}
      />

      <Modal
        title="Desejar excluir um cliente?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          notification.success({
            message: 'Cliente excluído com sucesso!',
          });
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>
          Tem certeza que deseja excluir este cliente? Após excluído essa ação
          não poderá ser desfeita!
        </p>
      </Modal>
    </Styled.ClientTableContainer>
  );
};
