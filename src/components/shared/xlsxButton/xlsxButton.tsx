/* eslint-disable @typescript-eslint/no-explicit-any */

// Packages
import { ReactElement, forwardRef, useState } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { FormItem } from 'react-hook-form-antd';
import { toast } from 'react-toastify';
import { Alert, DatePicker } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import moment from 'moment';

// Components
import { Button, Form, Modal, Tooltip, XlsxIcon } from 'components/core';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

const schema = zod.object({
  dateField: zod.array(zod.any()).nullable(),
  dateValue: zod.any(),
});

interface XlsxButtonProps {
  data?: Array<any> | undefined | null;
  filename: string;
}

type FormValues = {
  clientId: string;
  dateField: Array<string>;
  dateValue?: Array<string>;
};

export const XlsxButtonBase = (
  props: XlsxButtonProps,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined,
): ReactElement => {
  const { theme } = useGlobalContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isLoading },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
    reset();
  };

  const handleDownloadExcel = (data: FormValues) => {
    const filteredData = props?.data?.filter((task) => {
      if (!Array.isArray(data?.dateValue) || data?.dateValue?.length === 0) {
        return true;
      }

      const startDate = moment(data?.dateValue[0], 'DD/MM/YYYY');
      const endDate = moment(data?.dateValue[1], 'DD/MM/YYYY');

      return (
        moment(task?.DATA, 'DD/MM/YYYY').isSameOrBefore(endDate) &&
        moment(task?.DATA, 'DD/MM/YYYY').isSameOrAfter(startDate)
      );
    });

    if (
      !filteredData ||
      (Array.isArray(filteredData) && !filteredData.length)
    ) {
      return toast.error('Não há dados para gerar o EXCEL.');
    }

    const body = filteredData.map((item) => {
      let formatedItem = {};

      if (item) {
        Object.keys(item).forEach((key) => {
          if (Array.isArray(item[key])) {
            formatedItem = {
              ...formatedItem,
              [key]: (item[key] as any)?.join(', '),
            };

            return;
          }

          formatedItem = {
            ...formatedItem,
            [key]: item[key],
          };
        });
      }

      return formatedItem;
    });

    try {
      downloadExcel({
        fileName: `${
          props?.filename ?? 'Tabela'
        }-${new Date().toLocaleDateString()}`,
        sheet: 'react-export-table-to-excel',
        tablePayload: {
          header: Object.keys(filteredData[0]),
          body,
        },
      });
    } catch {
      toast.error('Erro ao gerar o EXCEL.');
    }
  };

  return (
    <>
      <Tooltip title="Gerar EXCEL" defaultOpen={false}>
        <>
          <Button
            shape="circle"
            size="large"
            ref={ref}
            onClick={handleToggleModal}
          >
            <XlsxIcon fill={theme === 'dark' ? '#ffffffd8' : '#616161'} />
          </Button>
        </>
      </Tooltip>

      <Modal
        open={isOpenModal}
        centered
        title="Gerar EXCEL"
        loading={isLoading}
        animation
        onCancel={handleToggleModal}
        closable
        footer={null}
      >
        <Form className="content" onFinish={handleSubmit(handleDownloadExcel)}>
          <Alert
            message="Caso queira, escolha um PERÍODO para gerar o EXCEL com os dados filtrados. Caso contrário, o EXCEL será gerado com todos os dados."
            type="info"
            showIcon
          />
          <br />

          <FormItem control={control} name="dateField">
            <DatePicker.RangePicker
              id="dateField"
              size="large"
              format={{
                format: 'DD/MM/YYYY',
                type: 'mask',
              }}
              style={{ width: '100%' }}
              onChange={(_event, dateString) => {
                setValue('dateValue', dateString);
              }}
            ></DatePicker.RangePicker>
          </FormItem>

          <Button
            id="excel-modal-submit"
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={isSubmitting}
          >
            Gerar EXCEL
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export const XlsxButton = forwardRef(XlsxButtonBase);
