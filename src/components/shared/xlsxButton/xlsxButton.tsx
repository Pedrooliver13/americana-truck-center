// Packages
import { ReactElement, forwardRef } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { toast } from 'react-toastify';

// Components
import { Button, Tooltip, XlsxIcon } from 'components/core';

interface XlsxButtonProps {
  data: { [key: string]: string | number | boolean }[];
  filename: string;
}

export const XlsxButtonBase = (
  props: XlsxButtonProps,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined
): ReactElement => {
  const handleDownloadExcel = () => {
    if (Array.isArray(props.data) && !props.data.length) {
      return toast.error('Não há dados para gerar o EXCEL.');
    }

    downloadExcel({
      fileName: `${props?.filename}-${new Date().toLocaleDateString()}`,
      sheet: 'react-export-table-to-excel',
      tablePayload: {
        header: Object.keys(props?.data[0]),
        body: props?.data,
      },
    });
  };

  return (
    <Tooltip title="Gerar EXCEL" defaultOpen={false}>
      <>
        <Button
          shape="circle"
          size="large"
          ref={ref}
          onClick={handleDownloadExcel}
        >
          <XlsxIcon />
        </Button>
      </>
    </Tooltip>
  );
};

export const XlsxButton = forwardRef(XlsxButtonBase);
