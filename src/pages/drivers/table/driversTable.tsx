// Packages
import { ReactElement, useState } from 'react';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button, Modal, Tooltip } from 'components/core';
import { TableTemplate } from 'components/layout';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { useDriversTableTour } from 'hooks/drivers/useDriversTableTour';
import { useDriversContext } from 'hooks/drivers/useDriversContext';

export const DriversTable = (): ReactElement => {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const { getColumnSearchProps } = useGetColumnSearch();

  const { isOpenTourState, ref1, ref2, ref3, ref4, ref5, ref6, steps } =
    useDriversTableTour();

  const {
    driversList,
    formatedDataToExport,
    deleteDriver,
    onToggleModal,
    navigate,
    isOpenModal,
    isLoading,
  } = useDriversContext();

  const handleToggleModal = () => {
    onToggleModal();
  };

  const handleDeleteDriver = (id: string) => {
    deleteDriver(id);
  };

  return (
    <>
      <TableTemplate
        header={{
          title: 'Motoristas',
          buttonLabel: 'Adicionar motorista',
          buttonLink: '/drivers/new',
        }}
        exports={{
          xlsx: {
            filename: `tabela-de-motoritas`,
            data: formatedDataToExport,
          },
          pdf: {
            filename: `tabela-de-motoritas`,
            data: formatedDataToExport,
          },
        }}
        table={{
          rowKey: 'id',
          dataSource: driversList,
          isLoading,
          columns: [
            {
              title: 'Empresa',
              dataIndex: 'clientName',
              key: 'clientName',
              width: '18%',
              sorter: (a, b) => a?.clientName?.localeCompare(b?.clientName),
              ...getColumnSearchProps('clientName', 'Empresa'),
            },
            {
              title: 'Nome',
              dataIndex: 'name',
              key: 'name',
              width: '25%',
              sorter: (a, b) => a.name.localeCompare(b.name),
              ...getColumnSearchProps('name', 'Nome'),
            },
            {
              title: 'Matrícula',
              dataIndex: 'code',
              key: 'code',
              width: '5%',
              sorter: (a, b) => {
                if (a?.code === b?.code) {
                  return 0;
                }

                a?.code.localeCompare(b?.code);
              },
              ...getColumnSearchProps('code', 'Matrícula'),
            },
            {
              title: 'Documento',
              dataIndex: 'document',
              key: 'document',
              responsive: ['md'],
              ...getColumnSearchProps('document', 'Documento'),
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              responsive: ['md'],
              ...getColumnSearchProps('email', 'Email'),
            },
            {
              title: 'Contato',
              dataIndex: 'phone',
              key: 'phone',
              responsive: ['md'],
              ...getColumnSearchProps('phone', 'Contato'),
            },
            {
              title: 'Ações',
              dataIndex: 'actions',
              key: 'actions',
              align: 'center',
              width: '100px',
              render: (_text, record) => (
                <div className="table__actions">
                  <Tooltip title="Editar Motorista">
                    <>
                      <Button
                        id="edit-driver"
                        type="text"
                        className="table__actions--normal"
                        icon={<EditOutlinedIcon color="#2B3034" />}
                        size="small"
                        onClick={() => navigate(`/drivers/${record?.id}`)}
                      />
                    </>
                  </Tooltip>
                  <Tooltip title="Deletar Motorista">
                    <>
                      <Button
                        id="delete-driver"
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
            'code',
            'document',
            'phone',
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
        title="Desejar excluir um motorista?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          if (removeId) {
            handleDeleteDriver(String(removeId));
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
