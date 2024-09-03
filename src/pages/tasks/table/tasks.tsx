// Packages
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TableColumnsType, Tour } from 'antd';
import {
  EditOutlined as EditOutlinedIcon,
  FileTextOutlined as FileTextOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  QuestionCircleOutlined as QuestionCircleOutlinedIcon,
} from '@ant-design/icons';

// Components
import {
  Table,
  Button,
  Modal,
  Input,
  Tag,
  Card,
  Tooltip,
} from 'components/core';
import { ButtonHideColumns, PdfButton, XlsxButton } from 'components/shared';

// Hooks
import { useGetTasks } from 'hooks/tasks/useGetTasks';
import { useTaskTableTour } from 'hooks/tasks/useTaskTableTour';
import { useGetColumnSearch, useGetHiddenColumns } from 'hooks/core';

// Models
import { Task } from 'models/tasks/tasks';

// Pdfs
import { generateReceiptsPDF } from 'pdfs/receiptsPdf';

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
  services: Array<{ name: string; total: number }>;
}

const data: Array<Task> = Array(1000)
  .fill(null)
  .map((_, index) => ({
    id: `${index}`,
    registrationNumber: '638.822.570-59',
    vehicle: index % 2 === 0 ? 'Mercedez Bens' : 'BMW',
    name: 'John Brown',
    total: index % 2 === 0 ? 600 : 600,
    date: index % 2 === 0 ? '27/06/2024' : '10/10/2021',
    services: [
      { name: 'Lubrificação', total: 200 },
      { name: 'troca de pneus', total: 200 },
      { name: 'Lubrificação', total: 200 },
    ],
  }));

const formatData = () => {
  return data.map((item) => {
    return {
      ...item,
      services: item.services.map((service) => service.name),
    };
  });
};

export const Tasks = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isOpenTourState, steps, ref1, ref2, ref3, ref4, ref5, ref6 } =
    useTaskTableTour();

  const { isPending } = useGetTasks();
  const { getColumnSearchProps } = useGetColumnSearch<DataType>();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
        <Tag color="green">{priceFormatter.format(value ?? 0)}</Tag>
      ),
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      responsive: ['md'],
      ...getColumnSearchProps('date', 'Data'),
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: '100px',
      render: (_value, record) => (
        <div className="table__actions">
          <Tooltip title="Editar Serviço">
            <>
              <Button
                id="edit-service"
                type="text"
                className="table__actions--normal"
                icon={<EditOutlinedIcon color="#2B3034" />}
                size="small"
              />
            </>
          </Tooltip>
          <Tooltip title="Gerar Recibo">
            <>
              <Button
                id="print-service"
                type="text"
                icon={<FileTextOutlinedIcon color="#2B3034" />}
                size="small"
                onClick={() => generateReceiptsPDF(record as unknown as Task)}
              />
            </>
          </Tooltip>
          <Tooltip title="Deletar Serviço">
            <>
              <Button
                id="delete-service"
                danger
                icon={<DeleteOutlinedIcon />}
                type="text"
                size="small"
                onClick={handleToggleModal}
              />
            </>
          </Tooltip>
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
        <h1>
          Serviços
          <Tooltip title="Fazer tour da página" placement="bottom">
            <div>
              <QuestionCircleOutlinedIcon
                id="info-icon"
                onClick={() => isOpenTourState[1](true)}
              />
            </div>
          </Tooltip>
        </h1>

        <Link to="/tasks/new" ref={ref1}>
          <Button size="middle" type="primary">
            Adicionar Serviço
          </Button>
        </Link>
      </header>

      <Card className="tasks-card">
        <div className="tasks-card__actions">
          <div className="tasks-card__actions--search" ref={ref2}>
            <Input
              id="task-search"
              size="large"
              placeholder="Pesquisar"
              allowClear
              autoComplete="off"
              prefix={<SearchOutlinedIcon />}
            />
          </div>

          <div className="tasks-card__actions--columns">
            <XlsxButton
              filename="tabela-de-servicos"
              ref={ref3}
              data={formatData()}
            />
            <PdfButton
              filename="tabela-de-servicos"
              ref={ref4}
              data={formatData()}
            />
            <ButtonHideColumns
              ref={ref5}
              {...{ options, checkedList, setCheckedList }}
            />
          </div>
        </div>

        <div ref={ref6}>
          <Table
            id="tasks-table"
            rowKey="id"
            data-cy="tasks-table"
            columns={newColumns}
            dataSource={data}
            isLoading={isPending}
            size="small"
            bordered
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
        </div>
      </Card>

      <Modal
        title="Desejar excluir o serviço?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          toast.success('Serviço excluído com sucesso!');
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>
          Tem certeza que deseja excluir este registro? Após excluído essa ação
          não poderá ser desfeita!
        </p>
      </Modal>

      <Tour
        open={isOpenTourState[0]}
        onClose={() => isOpenTourState[1](false)}
        steps={steps}
        zIndex={999999}
      />
    </Styled.TasksContainer>
  );
};
