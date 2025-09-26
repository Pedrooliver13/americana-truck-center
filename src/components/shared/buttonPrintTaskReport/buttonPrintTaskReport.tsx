// Packages
import { ReactElement, useState } from 'react';
import { FileTextOutlined as FileTextOutlinedIcon } from '@ant-design/icons';

// Components
import { Modal, Button } from 'components/core';

// Pdfs
import { downloadReceiptsPDF } from 'pdfs/receiptsPdf';
import { downloadMultipleReceiptsPDF } from 'pdfs/multipleReceiptsPdf';

// Models
import { Task } from 'models/tasks/tasks';

interface ButtonPrintTaskReportProps {
  record?: Task | Task[];
  ids?: string[];
  size?: 'small' | 'middle' | 'large';
  shape?: 'default' | 'circle' | 'round';
  type?: 'text' | 'primary' | 'dashed' | 'link' | 'default';
}

export const ButtonPrintTaskReport = (
  props: ButtonPrintTaskReportProps
): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleDownloadPDF = (isShowValue = false) => {
    if (Array.isArray(props?.record) && Array.isArray(props?.ids)) {
      const filteredRecords = (props.record as Task[]).filter(
        (task) => props?.ids && props?.ids.includes(task?.id)
      );

      downloadMultipleReceiptsPDF(filteredRecords, isShowValue);
      handleToggleModal();
      return;
    }

    downloadReceiptsPDF(props.record as unknown as Task, isShowValue);
    handleToggleModal();
  };

  return (
    <>
      <Button
        id="print-service"
        type={props?.type || 'text'}
        className="table__actions--normal btn-batch-status"
        icon={<FileTextOutlinedIcon color="#2B3034" />}
        size={props?.size || 'small'}
        shape={props?.shape || 'default'}
        onClick={handleToggleModal}
      />

      <Modal
        title="Desejar esconder os valores no recibo?"
        open={isOpenModal}
        centered
        okText="Mostrar"
        cancelText="Não Mostrar"
        onCancel={handleToggleModal}
        cancelButtonProps={{ onClick: () => handleDownloadPDF(false) }}
        onOk={() => handleDownloadPDF(true)}
      >
        <p>Ao selecionar "Mostrar", os valores vão ser exibidos no recibo!</p>
      </Modal>
    </>
  );
};
