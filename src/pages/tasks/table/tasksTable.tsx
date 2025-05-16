// Packages
import { ReactElement, useState } from 'react';
import moment from 'moment';
import {
  DeleteOutlined as DeleteOutlinedIcon,
  EyeOutlined as EyeOutlinedIcon,
} from '@ant-design/icons';

// Components
import { TableTemplate } from 'components/layout';
import { ButtonPrintTaskReport, ButtonTaskStatus } from 'components/shared';
import { Button, Modal, Table, Tag, Tooltip } from 'components/core';
import { ButtonBatchTaskStatus } from 'components/shared/buttonBatchTaskStatus';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { useTaskTableTour } from 'hooks/tasks/useTaskTableTour';
import { useTasksContext } from 'hooks/tasks/useTasksContext';

// Models
import { Task } from 'models/tasks/tasks';

// Utils
import { priceFormatter } from 'utils/formatter';

export const Tasks = (): ReactElement => {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    Array<React.Key | string>
  >([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isBatch, setIsBatch] = useState(false);

  const { isOpenTourState, steps, ref1, ref2, ref3, ref4, ref5, ref6 } =
    useTaskTableTour();

  const {
    tasksList,
    deleteTask,
    deleteBatchTasks,
    navigate,
    formatedDataToExport,
    isLoading,
  } = useTasksContext();

  const { getColumnSearchProps } = useGetColumnSearch<Task>();

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleDeleteTask = (id: string) => {
    if (isBatch) {
      setIsBatch(false);

      return selectedRowKeys.length > 0
        ? deleteBatchTasks(selectedRowKeys.map(String)).then(() =>
            setSelectedRowKeys([])
          )
        : null;
    }

    deleteTask(id);
  };

  return (
    <>
      <TableTemplate
        header={{
          title: 'Serviços',
          buttonLabel: 'Adicionar serviço',
          buttonLink: '/tasks/new',
          extraButtons: (
            <>
              {Boolean(selectedRowKeys?.length) && (
                <>
                  <ButtonBatchTaskStatus
                    selectedRows={selectedRowKeys.map(String)}
                  />

                  <Tooltip title="Deletar múltiplos serviços">
                    <div>
                      <Button
                        danger
                        size="large"
                        shape="circle"
                        onClick={() => {
                          handleToggleModal();
                          setIsBatch((state) => !state);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </Button>
                    </div>
                  </Tooltip>
                </>
              )}
            </>
          ),
        }}
        exports={{
          xlsx: {
            filename: `tabela-de-serviços`,
            data: formatedDataToExport,
          },
          pdf: {
            filename: `tabela-de-serviços`,
            data: formatedDataToExport,
          },
        }}
        table={{
          dataSource: tasksList,
          isLoading: isLoading,
          rowKey: 'id',
          rowSelection: {
            selectedRowKeys,
            onChange: (newRows) => setSelectedRowKeys(newRows),
          },
          expandable: {
            expandedRowRender: (row) => {
              return (
                <Table
                  dataSource={row?.services}
                  minHeight="0"
                  rowKey={'id'}
                  pagination={false}
                  columns={[
                    {
                      title: 'Serviço',
                      dataIndex: 'name',
                      key: 'name',
                      render: (value) => <Tag color="blue">{value}</Tag>,
                    },
                    {
                      title: 'Valor',
                      dataIndex: 'value',
                      key: 'value',
                      render: (value) => (
                        <Tag color="green">
                          {priceFormatter.format(value ?? 0)}
                        </Tag>
                      ),
                    },
                  ]}
                />
              );
            },
          },
          columns: [
            {
              title: 'Cliente',
              dataIndex: 'clientName',
              key: 'clientName',
              width: '20%',
              sorter: (a, b) => a?.clientName?.localeCompare(b.clientName),
              ...getColumnSearchProps('clientName', 'Cliente'),
            },
            {
              title: 'CNPJ / CPF do Cliente',
              dataIndex: 'document',
              key: 'document',
              width: '20%',
              sorter: (a, b) => a.document.localeCompare(b.document),
              ...getColumnSearchProps('document', 'CNPJ do Cliente'),
            },
            {
              title: 'Nome',
              dataIndex: 'name',
              key: 'name',
              width: '20%',
              sorter: (a, b) => a.name.localeCompare(b.name),
              ...getColumnSearchProps('name', 'Nome'),
            },
            {
              title: 'Documento',
              dataIndex: 'driverDocument',
              key: 'driverDocument',
              ...getColumnSearchProps('driverDocument', 'Documento'),
            },
            {
              title: 'Contato',
              dataIndex: 'phone',
              key: 'phone',
              ...getColumnSearchProps('phone', 'Contato'),
            },
            {
              title: 'Veículo',
              dataIndex: 'vehicle',
              key: 'vehicle',
              ...getColumnSearchProps('vehicle', 'Veículo'),
            },
            {
              title: 'Placa do Veículo',
              dataIndex: 'licensePlate',
              key: 'licensePlate',
              ...getColumnSearchProps('licensePlate', 'Placa do Veículo'),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
              sorter: (a, b) => a.total - b.total,
              ...getColumnSearchProps('total', 'Total', (record) => {
                return priceFormatter.format(record ?? 0);
              }),
              render: (value) => (
                <Tag color="green">{priceFormatter.format(value ?? 0)}</Tag>
              ),
            },
            {
              title: 'Observações',
              dataIndex: 'observation',
              key: 'observation',
              ...getColumnSearchProps('observation', 'Observações'),
            },
            {
              title: 'Data',
              dataIndex: 'createdAt',
              key: 'createdAt',
              sorter: (a, b) => {
                return a?.createdAt?.seconds - b?.createdAt?.seconds;
              },
              ...getColumnSearchProps('createdAt', 'Data', (record) => {
                return moment(record?.seconds * 1000).format(
                  'DD/MM/YYYY HH:mm'
                );
              }),
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              sorter: (a, b) => {
                return a?.status - b?.status;
              },
              ...getColumnSearchProps('statusName', 'Status'),
              render: (value, record) => {
                return <ButtonTaskStatus status={value} record={record} />;
              },
            },
            {
              title: 'Ações',
              dataIndex: 'actions',
              key: 'actions',
              align: 'center',
              width: '100px',
              render: (_value, record) => (
                <div className="table__actions">
                  <Tooltip title="Visualizar Serviço">
                    <>
                      <Button
                        id="visualize-service"
                        type="text"
                        className="table__actions--normal"
                        icon={<EyeOutlinedIcon color="#2B3034" />}
                        size="small"
                        onClick={() => navigate(`/tasks/${record?.id}`)}
                      />
                    </>
                  </Tooltip>
                  <Tooltip title="Gerar Recibo">
                    <>
                      <ButtonPrintTaskReport record={record} />
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
                        onClick={() => {
                          setRemoveId(record?.id);
                          handleToggleModal();
                        }}
                      />
                    </>
                  </Tooltip>
                </div>
              ),
            },
          ],
          defaultCheckedList: [
            'clientName',
            'name',
            'total',
            'createdAt',
            'status',
            'actions',
          ],
        }}
        tour={{
          isOpenTourState,
          steps,
          ref1,
          ref2,
          ref3,
          ref4,
          ref5,
          ref6,
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
          handleDeleteTask(String(removeId));
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>
          {selectedRowKeys?.length >= 1
            ? 'Tem certeza que deseja excluir estes registros? '
            : 'Tem certeza que deseja excluir este registro? '}
          Após excluído essa ação não poderá ser desfeita!
        </p>
      </Modal>
    </>
  );
};
