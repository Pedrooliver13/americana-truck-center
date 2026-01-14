// Packages
import { ReactElement, useState } from 'react';
import { DeleteOutlined as DeleteOutlinedIcon } from '@ant-design/icons';
import moment from 'moment';

// Components
import { Button, Modal, Tooltip } from 'components/core';
import { TableTemplate } from 'components/layout';
import { ButtonPrintHygieneCertificateReport } from 'components/shared/buttonPrintHygieneCertificateReport';

// Hooks
import { useGetColumnSearch } from 'hooks/core';
import { useReportsTableTour } from 'hooks/reports/useReportsTableTour';
import { useReportsContext } from 'hooks/reports/useReportsContext';

export const ReportsTable = (): ReactElement => {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const { getColumnSearchProps } = useGetColumnSearch();

  const { isOpenTourState, ref1, ref2, ref3, ref4, ref5, ref6, steps } =
    useReportsTableTour();

  const {
    reportsList,
    formatedDataToExport,
    deleteReport,
    onToggleModal,
    isOpenModal,
    isLoading,
  } = useReportsContext();

  const handleToggleModal = () => {
    onToggleModal();
  };

  const handleDeleteReport = (id: string) => {
    deleteReport(id);
  };

  return (
    <>
      <TableTemplate
        header={{
          title: 'Laudos',
          buttonLabel: 'Adicionar Laudo',
          buttonLink: '/reports/new',
        }}
        exports={{
          xlsx: {
            filename: `tabela-de-laudos`,
            data: formatedDataToExport,
          },
          pdf: {
            filename: `tabela-de-laudos`,
            data: formatedDataToExport,
          },
        }}
        table={{
          rowKey: 'id',
          dataSource: reportsList,
          isLoading,
          columns: [
            {
              title: 'Razão Social',
              dataIndex: 'socialName',
              key: 'socialName',
              sorter: (a, b) => {
                if (a?.socialName === b?.socialName) {
                  return 0;
                }

                return a?.socialName?.localeCompare(b?.socialName);
              },
              ...getColumnSearchProps('socialName', 'Razão Social'),
            },
            {
              title: 'Id do Laudo',
              dataIndex: 'reportId',
              key: 'reportId',
              ...getColumnSearchProps('reportId', 'ID', (record) => {
                return String(record)?.substring(0, 5);
              }),
            },
            {
              title: 'Data de criação',
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
              title: 'Ações',
              dataIndex: 'actions',
              key: 'actions',
              align: 'center',
              width: '100px',
              render: (_text, record) => (
                <div className="table__actions">
                  <ButtonPrintHygieneCertificateReport record={record} />
                  <Tooltip title="Deletar Laudo">
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
            'reportId',
            'socialName',
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
        title="Desejar excluir um laudo?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          if (removeId) {
            handleDeleteReport(String(removeId));
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
