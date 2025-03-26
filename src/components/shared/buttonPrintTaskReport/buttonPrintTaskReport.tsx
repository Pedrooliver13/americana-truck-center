// Packages
import { ReactElement, useState } from 'react';
import { FileTextOutlined as FileTextOutlinedIcon } from '@ant-design/icons';

// Components
import { Modal, Button } from 'components/core';

// Pdfs
import { downloadReceiptsPDF } from 'pdfs/receiptsPdf';

// Models
import { Task } from 'models/tasks/tasks';

interface ButtonPrintTaskReportProps {
  record: Task;
}

export const ButtonPrintTaskReport = (
  props: ButtonPrintTaskReportProps
): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleDownloadPDF = (isShowValue = false) => {
    downloadReceiptsPDF(props.record as unknown as Task, isShowValue);
    handleToggleModal();
  };

  return (
    <>
      <Button
        id="print-service"
        type="text"
        className="table__actions--normal"
        icon={<FileTextOutlinedIcon color="#2B3034" />}
        size="small"
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
