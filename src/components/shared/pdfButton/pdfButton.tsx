// Packages
import { ReactElement, forwardRef } from 'react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Components
import { Button, Tooltip, PdfIcon } from 'components/core';

interface PdfButtonProps {
  data: { [key: string]: string | number | boolean }[];
  filename: string;
}

export const PdfButtonBase = (
  props: PdfButtonProps,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined
): ReactElement => {
  const handleDownloadPdf = () => {
    if (Array.isArray(props.data) && !props.data.length) {
      return toast.error('Não há dados para gerar o PDF.');
    }

    const doc = new jsPDF();
    const values = props?.data.map((item) => Object.values(item));

    autoTable(doc, {
      head: [Object.keys(props?.data[0])],
      body: values,
    });

    doc.save(`${props?.filename}-${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <Tooltip title="Gerar PDF" defaultOpen={false}>
      <>
        <Button
          shape="circle"
          size="large"
          ref={ref}
          onClick={handleDownloadPdf}
        >
          <PdfIcon />
        </Button>
      </>
    </Tooltip>
  );
};

export const PdfButton = forwardRef(PdfButtonBase);
