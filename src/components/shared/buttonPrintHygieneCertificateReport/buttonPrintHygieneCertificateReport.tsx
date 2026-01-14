// Packages
import { ReactElement } from 'react';
import { FileTextOutlined as FileTextOutlinedIcon } from '@ant-design/icons';

// Components
import { Button, Tooltip } from 'components/core';

// Models
import { Task } from 'models/tasks/tasks';
import { Report } from 'models/reports/reports';

// Pdfs
import { generateHygieneCertificate } from 'pdfs/hygieneCertificatePdf';

interface ButtonPrintHygieneCertificateReportProps {
  record?: Task | Task[];
  size?: 'small' | 'middle' | 'large';
  shape?: 'default' | 'circle' | 'round';
  type?: 'text' | 'primary' | 'dashed' | 'link' | 'default';
}

export const ButtonPrintHygieneCertificateReport = (
  props: ButtonPrintHygieneCertificateReportProps
): ReactElement => {
  const handleDownloadPDF = () => {
    generateHygieneCertificate(props.record as unknown as Report);
  };

  return (
    <Tooltip title="Gerar Laudo">
      <>
        <Button
          id="print-hygiene-certificate-report"
          type={props?.type || 'text'}
          className="table__actions--normal btn-batch-status"
          icon={<FileTextOutlinedIcon color="#2B3034" />}
          size={props?.size || 'small'}
          shape={props?.shape || 'default'}
          onClick={handleDownloadPDF}
        />
      </>
    </Tooltip>
  );
};
