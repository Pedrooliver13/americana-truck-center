// Packages
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, CheckboxOptionType, TableColumnsType, Tag } from 'antd';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Table, Button, Modal, Input } from 'components/core';

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
        <Button size="large" type="primary">
          <Link to="/tasks/new">Adicionar Serviços</Link>
        </Button>
      </header>

      <div className="tasks__actions">
        <Input id="task-search" placeholder="Pesquisar" allowClear />

        <Checkbox.Group
          value={checkedList}
          options={options as CheckboxOptionType[]}
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
                <Tag color="orange">Lubrificação</Tag>
                <Tag color="orange">Lubrificação</Tag>
                <Tag color="orange">Lubrificação</Tag>
                <Tag color="orange">Lubrificação</Tag>
                <Tag color="orange">Lubrificação</Tag>
              </p>
            </div>
          ),
        }}
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: ['5', '10', '20', '30'],
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
        onOk={handleToggleModal}
        okButtonProps={{ danger: true }}
      >
        <p>
          Tem certeza que deseja excluir este registro? Após excluindo essa ação
          não poderá ser desfeita!
        </p>
      </Modal>
    </Styled.TasksContainer>
  );
};
