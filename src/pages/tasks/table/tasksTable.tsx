// Packages
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  FileTextOutlined as FileTextOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  EyeOutlined as EyeOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button, Modal, Table, Tag, Tooltip } from 'components/core';
import { TableTemplate } from 'components/layout';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { useTaskTableTour } from 'hooks/tasks/useTaskTableTour';
import { useGetAllTasks } from 'hooks/tasks/useGetAllTasks';
import { useDeleteByIdTask } from 'hooks/tasks/useDeleteTaskById';

// Models
import { Task } from 'models/tasks/tasks';

// Pdfs
import { generateReceiptsPDF } from 'pdfs/receiptsPdf';

// Utils
import { priceFormatter } from 'utils/formatter';

interface DataType {
  id: string;
  name: string;
  document: string | number;
  vehicle: string;
  createdAt: string;
  total: number;
  status: number;
  services: Array<string>;
}

export const Tasks = (): ReactElement => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTasks();
  const { mutate } = useDeleteByIdTask();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const { getColumnSearchProps } = useGetColumnSearch<DataType>();

  const { isOpenTourState, steps, ref1, ref2, ref3, ref4, ref5, ref6 } =
    useTaskTableTour();

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const formatedDataToExport = data?.map((item) => {
    return {
      NOME: item?.name,
      DOCUMENTO: item?.document,
      PLACA: item?.licensePlate,
      'TOTAL(R$)': item?.total ?? 0,
      SERVIÇOS: item?.services?.map((service) => service?.name).join(', '),
      DATA: moment(item?.createdAt?.seconds * 1000).format('DD/MM/YYYY'),
    };
  });

  return (
    <>
      <TableTemplate
        header={{
          title: 'Serviços',
          buttonLabel: 'Adicionar serviço',
          buttonLink: '/tasks/new',
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
          dataSource: data,
          isLoading,
          rowKey: 'id',
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
                      width: '25%',
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
              title: 'Nome',
              dataIndex: 'name',
              key: 'name',
              width: '25%',
              sorter: (a, b) => a.name.localeCompare(b.name),
              ...getColumnSearchProps('name', 'Nome'),
            },
            {
              title: 'Documento',
              dataIndex: 'document',
              key: 'document',
              responsive: ['md'],
              ...getColumnSearchProps('document', 'Documento'),
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
              ...getColumnSearchProps('total', 'Total'),
              render: (value) => (
                <Tag color="green">{priceFormatter.format(value ?? 0)}</Tag>
              ),
            },
            {
              title: 'Data',
              dataIndex: 'createdAt',
              key: 'createdAt',
              responsive: ['md'],
              sorter: (a, b) => {
                return a?.createdAt?.seconds - b?.createdAt?.seconds;
              },
              ...getColumnSearchProps('createdAt', 'Data'),
              render: (value) => {
                return (
                  moment(value.seconds * 1000).format('DD/MM/YYYY HH:mm') ?? '-'
                );
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
                      <Button
                        id="print-service"
                        type="text"
                        icon={<FileTextOutlinedIcon color="#2B3034" />}
                        size="small"
                        onClick={() =>
                          generateReceiptsPDF(record as unknown as Task)
                        }
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
            'name',
            'document',
            'total',
            'createdAt',
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
          if (removeId) {
            mutate(String(removeId));
          }

          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>
          Tem certeza que deseja excluir este registro? Após excluído essa ação
          não poderá ser desfeita!
        </p>
      </Modal>
    </>
  );
};
