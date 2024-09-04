// Packages
import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button, Modal, Tooltip } from 'components/core';
import { TableTemplate } from 'components/layout';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { usePricesTableTour } from 'hooks/prices/usePricesTableTour';

interface DataType {
  id: string;
  name: string;
  registrationNumber: string | number;
  date: string;
}

const data = Array(1000)
  .fill(null)
  .map((_, index) => ({
    id: `${index}`,
    name: 'John Brown',
    visualPrice: 100,
    completePrice: 200,
    date: '13/08/2021',
  }));

export const PricesTable = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { getColumnSearchProps } = useGetColumnSearch<DataType>();
  const { isOpenTourState, ref1, ref2, ref3, ref4, ref5, ref6, steps } =
    usePricesTableTour();

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <>
      <TableTemplate
        header={{
          title: 'Preços',
          buttonLabel: 'Adicionar preço',
          buttonLink: '/price/new',
        }}
        exports={{
          xlsx: {
            filename: `tabela-de-clientes-${new Date().toLocaleDateString()}`,
          },
          pdf: {
            filename: `tabela-de-clientes-${new Date().toLocaleDateString()}`,
          },
        }}
        table={{
          dataSource: data,
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
              title: 'Data',
              dataIndex: 'date',
              key: 'date',
              responsive: ['md'],
              ...getColumnSearchProps('date', 'Documento'),
            },
            {
              title: 'Ações',
              dataIndex: 'actions',
              key: 'actions',
              align: 'center',
              width: '100px',
              render: () => (
                <div className="table__actions">
                  <Tooltip title="Editar Preço">
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
                  <Tooltip title="Deletar Preço">
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
          defaultCheckedList: ['name', 'registrationNumber', 'date', 'actions'],
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
        title="Desejar excluir um preço?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          toast.success('Preço excluído com sucesso!');
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
