// Packages
import { ReactElement, useState } from 'react';
import moment from 'moment';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@ant-design/icons';

// Components
import { TableTemplate } from 'components/layout';
import { ClientXlsxModal } from 'components/shared';
import { Button, Modal, Table, Tag, Tooltip } from 'components/core';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { useClientsTableTour } from 'hooks/clients/useClientsTableTour';
import { useClientsContext } from 'hooks/clients/useClientsContext';

// Models
import { Clients } from 'models/clients/clients';

// Utils
import { priceFormatter } from 'utils/formatter';

export const ClientsTable = (): ReactElement => {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isOpenTourState, ref1, ref2, ref3, ref4, ref5, ref6, steps } =
    useClientsTableTour();

  const {
    clientsList,
    tasksList,
    deleteClient,
    formatedDataToExport,
    navigate,
    isLoading,
  } = useClientsContext();

  const { getColumnSearchProps } = useGetColumnSearch<Clients>();

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleDeleteClient = (id: string) => {
    deleteClient(id);
  };

  return (
    <>
      <TableTemplate
        header={{
          title: 'Clientes',
          buttonLabel: 'Adicionar cliente',
          buttonLink: '/clients/new',
        }}
        exports={{
          xlsx: {
            filename: `tabela-de-clientes`,
            customComponent: <ClientXlsxModal />,
          },
          pdf: {
            filename: `tabela-de-clientes`,
            data: formatedDataToExport,
          },
        }}
        table={{
          dataSource: clientsList,
          isLoading,
          rowKey: 'id',
          expandable: {
            expandedRowRender: (row) => {
              const data = tasksList?.filter(
                (item) => item?.client === row?.id
              );

              return (
                <Table
                  dataSource={data}
                  minHeight="0"
                  rowKey={'id'}
                  pagination={false}
                  columns={[
                    {
                      title: 'Serviço',
                      dataIndex: 'name',
                      key: 'name',
                      width: '26%',
                    },
                    {
                      title: 'Total',
                      dataIndex: 'total',
                      key: 'total',
                      width: '24%',
                      render: (value) => (
                        <Tag color="green">
                          {priceFormatter.format(value ?? 0)}
                        </Tag>
                      ),
                    },
                    {
                      title: 'Data',
                      dataIndex: 'createdAt',
                      key: 'createdAt',
                      render: (value) => {
                        return (
                          moment(value.seconds * 1000).format(
                            'DD/MM/YYYY HH:mm'
                          ) ?? '-'
                        );
                      },
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
                  <Tooltip title="Editar Cliente">
                    <>
                      <Button
                        id="edit-client"
                        type="text"
                        className="table__actions--normal"
                        icon={<EditOutlinedIcon color="#2B3034" />}
                        size="small"
                        onClick={() => navigate(`/clients/${record?.id}`)}
                      />
                    </>
                  </Tooltip>
                  <Tooltip title="Deletar Cliente">
                    <>
                      <Button
                        id="delete-client"
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
          defaultCheckedList: ['name', 'document', 'phone', 'email', 'actions'],
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
        title="Desejar excluir um cliente?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          if (removeId) {
            handleDeleteClient(String(removeId));
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
