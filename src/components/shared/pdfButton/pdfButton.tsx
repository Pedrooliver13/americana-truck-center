// Packages
import { ReactElement, forwardRef } from 'react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Components
import { Button, Tooltip, PdfIcon } from 'components/core';

interface PdfButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Array<{ [key: string]: any }>;
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
    if (!props?.data || (Array.isArray(props?.data) && !props?.data.length)) {
      return toast.error('Não há dados para gerar o PDF.');
    }

    const doc = new jsPDF();

    const values = props?.data
      .map((item) => {
        return Object.values(item).map((value) => {
          if (Array.isArray(value)) {
            return Object.values(value).join(', ');
          }

          return value;
        });
      })
      .filter(Boolean);

    autoTable(doc, {
      head: [Object.keys(props?.data[0])],
      body: values,
      bodyStyles: { fontSize: 10 },
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
