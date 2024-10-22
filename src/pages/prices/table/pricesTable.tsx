// Packages
import { ReactElement, useState } from 'react';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button, Modal, Tag, Tooltip } from 'components/core';
import { TableTemplate } from 'components/layout';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { usePricesTableTour } from 'hooks/prices/usePricesTableTour';
import { usePricesContext } from 'hooks/prices/usePricesContext';

// Utils
import { priceFormatter } from 'utils/formatter';

export const PricesTable = (): ReactElement => {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const { getColumnSearchProps } = useGetColumnSearch();

  const { isOpenTourState, ref1, ref2, ref3, ref4, ref5, ref6, steps } =
    usePricesTableTour();

  const {
    pricesList,
    formatedDataToExport,
    deletePrice,
    onToggleModal,
    navigate,
    isOpenModal,
    isLoading,
  } = usePricesContext();

  const handleToggleModal = () => {
    onToggleModal();
  };

  const handleDeletePrice = (id: string) => {
    deletePrice(id);
  };

  return (
    <>
      <TableTemplate
        header={{
          title: 'Preços',
          buttonLabel: 'Adicionar preço',
          buttonLink: '/prices/new',
        }}
        exports={{
          xlsx: {
            filename: `tabela-de-preços`,
            data: formatedDataToExport,
          },
          pdf: {
            filename: `tabela-de-preços`,
            data: formatedDataToExport,
          },
        }}
        table={{
          rowKey: 'id',
          dataSource: pricesList,
          isLoading,
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
              title: 'Valor Visual',
              dataIndex: 'minValue',
              key: 'minValue',
              ...getColumnSearchProps('minValue', 'Valor Visual'),
              render: (text) => {
                return <Tag color="green">{priceFormatter.format(text)}</Tag>;
              },
            },
            {
              title: 'Valor Completo',
              dataIndex: 'maxValue',
              key: 'maxValue',
              ...getColumnSearchProps('maxValue', 'Valor Completo'),
              render: (text) => {
                return <Tag color="green">{priceFormatter.format(text)}</Tag>;
              },
            },
            {
              title: 'Ações',
              dataIndex: 'actions',
              key: 'actions',
              align: 'center',
              width: '100px',
              render: (_text, record) => (
                <div className="table__actions">
                  <Tooltip title="Editar Preço">
                    <>
                      <Button
                        id="edit-service"
                        type="text"
                        className="table__actions--normal"
                        icon={<EditOutlinedIcon color="#2B3034" />}
                        size="small"
                        onClick={() => navigate(`/prices/${record?.id}`)}
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
          defaultCheckedList: ['name', 'minValue', 'maxValue', 'actions'],
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
          if (removeId) {
            handleDeletePrice(String(removeId));
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
