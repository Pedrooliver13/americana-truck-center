// Packages
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, TableColumnsType, notification } from 'antd';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Table, Button, Modal, Input, Tag } from 'components/core';

// Hooks
import { useGetColumnSearch, useGetHiddenColumns } from 'hooks/core';

// Utils
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

interface DataType {
  id: string;
  name: string;
  registrationNumber: string | number;
  vehicle: string;
  date: string;
  total: number;
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

export const Tasks = (): ReactElement => {
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
      title: 'Veículo',
      dataIndex: 'vehicle',
      key: 'vehicle',
      responsive: ['md'],
      ...getColumnSearchProps('vehicle', 'Veículo'),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      sorter: (a, b) => a.total - b.total,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('total', 'Total'),
      render: (value) => (
        <Tag color="green">{priceFormatter.format(value)}</Tag>
      ),
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
          <Button type="text" icon={<EditOutlinedIcon />} size="small" />
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
      defaultCheckedList: [
        'name',
        'registrationNumber',
        'total',
        'date',
        'actions',
      ],
    });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <Styled.TasksContainer className="container">
      <header className="tasks__header">
        <h1>Serviços</h1>

        <Link to="/tasks/new">
          <Button size="large" type="primary">
            Adicionar Serviço
          </Button>
        </Link>
      </header>

      <div className="tasks__actions">
        <div className="tasks__actions--search">
          <Input
            id="task-search"
            size="large"
            placeholder="Pesquisar"
            allowClear
            autoComplete="off"
          />
          <Button type="primary" size="large" icon={<SearchOutlinedIcon />}>
            Buscar
          </Button>
        </div>

        <Checkbox.Group
          value={checkedList}
          options={options}
          onChange={(value) => {
            setCheckedList(value as string[]);
          }}
        />
      </div>

      <Table
        id="tasks-table"
        rowKey="id"
        data-cy="tasks-table"
        columns={newColumns}
        dataSource={data}
        size="small"
        expandable={{
          expandedRowRender: () => (
            <div className="tasks-table__expands">
              <h3>Serviços: </h3>
              <p>
                <Tag color="purple">Lubrificação</Tag>
                <Tag color="purple">Lubrificação</Tag>
                <Tag color="purple">Lubrificação</Tag>
                <Tag color="purple">Lubrificação</Tag>
              </p>
            </div>
          ),
        }}
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
    </Styled.TasksContainer>
  );
};
