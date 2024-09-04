// Packages
import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import {
  EditOutlined as EditOutlinedIcon,
  FileTextOutlined as FileTextOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button, Modal, Tag, Tooltip } from 'components/core';
import { TableTemplate } from 'components/layout';

// Hooks
import { useTaskTableTour } from 'hooks/tasks/useTaskTableTour';
import { useGetColumnSearch } from 'hooks/core';

// Models
import { Task } from 'models/tasks/tasks';

// Pdfs
import { generateReceiptsPDF } from 'pdfs/receiptsPdf';

// Utils
import { priceFormatter } from 'utils/formatter';

interface DataType {
  id: string;
  name: string;
  registrationNumber: string | number;
  vehicle: string;
  date: string;
  total: number;
  status: number;
  services: Array<string>;
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
    services: ['Lubrificação', 'Troca de óleo', 'Troca de pneu'],
  }));

export const Tasks = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getColumnSearchProps } = useGetColumnSearch<DataType>();

  const { isOpenTourState, steps, ref1, ref2, ref3, ref4, ref5, ref6 } =
    useTaskTableTour();

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

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
            filename: `tabela-de-serviços-${new Date().toISOString()}`,
          },
          pdf: {
            filename: `tabela-de-serviços-${new Date().toISOString()}`,
          },
        }}
        table={{
          dataSource: data,
          rowKey: 'id',
          expandable: {
            expandedRowRender: () => (
              <div className="table-template__expands">
                <h3>Serviços: </h3>
                <p>
                  <Tag color="purple">Lubrificação</Tag>
                  <Tag color="purple">Lubrificação</Tag>
                  <Tag color="purple">Lubrificação</Tag>
                  <Tag color="purple">Lubrificação</Tag>
                </p>
              </div>
            ),
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
                        onClick={handleToggleModal}
                      />
                    </>
                  </Tooltip>
                </div>
              ),
            },
          ],
          defaultCheckedList: [
            'name',
            'registrationNumber',
            'total',
            'date',
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
    </>
  );
};
