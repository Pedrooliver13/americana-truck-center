// Packages
import { ReactElement, forwardRef, useCallback, useState } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { Alert, DatePicker } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { downloadExcel } from 'react-export-table-to-excel';
import { toast } from 'react-toastify';
import moment from 'moment';

// Components
import {
  Button,
  Form,
  Modal,
  Select,
  Tooltip,
  XlsxIcon,
} from 'components/core';

// Hooks
import { useClientsContext } from 'hooks/clients/useClientsContext';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Models
import { statusName } from 'models/tasks/tasks';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  clientId: zod.string().min(1, { message: 'Campo obrigatório' }),
  dateField: zod.array(zod.any()).min(2, { message: 'Campo obrigatório' }),
  dateValue: zod.any(),
});

type FormValues = {
  clientId: string;
  dateField: Array<string>;
  dateValue?: Array<string>;
};

const ClientXlsxModalBase = (
  _props: unknown,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined
): ReactElement => {
  const { theme } = useGlobalContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { tasksList, clientsList, clientListOptions, isLoading } =
    useClientsContext();

  const {
    control,
    setValue,
    setFocus,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      clientId: '',
      dateField: [],
      dateValue: [],
    },
    resolver: zodResolver(schema),
  });

  const getFormatedDataToExport = useCallback(
    (data: FormValues) => {
      if (!Array?.isArray(tasksList) || !data?.clientId) {
        return [];
      }

      const currentClient = clientsList?.find(
        (item) => item?.id === data?.clientId
      );

      const clientTasksList = tasksList
        ?.filter((task) => {
          return task?.client === data?.clientId;
        })
        .filter((task) => {
          if (
            !Array.isArray(data?.dateValue) ||
            data?.dateValue?.length === 0
          ) {
            return true;
          }

          const taskDate = moment(task?.createdAt?.seconds * 1000).format(
            'DD/MM/YYYY'
          );

          const startDate = moment(data?.dateValue[0], 'DD/MM/YYYY');
          const endDate = moment(data?.dateValue[1], 'DD/MM/YYYY');

          return (
            moment(taskDate, 'DD/MM/YYYY').isSameOrBefore(endDate) &&
            moment(taskDate, 'DD/MM/YYYY').isSameOrAfter(startDate)
          );
        });

      return clientTasksList?.map((task) => {
        return {
          CLIENTE: currentClient?.name ?? '',
          'NOME DO MOTORISTA': task?.name,
          'DOCUMENTO DO MOTORISTA': task?.driverDocument,
          'DOCUMENTO DO CLIENTE': task?.document,
          CELULAR: task?.phone,
          PREÇO: task?.total,
          FROTA: task?.fleet,
          SERVIÇOS: task?.services?.map((service) => service?.name).join(', '),
          OBSERVAÇÕES: task?.observation ?? '',
          DATA: moment(task?.createdAt?.seconds * 1000).format('DD/MM/YYYY'),
          STATUS: statusName[task.status],
        };
      });
    },
    [tasksList, clientsList]
  );

  const handleGenerateExcel = (data: FormValues): void => {
    const body = getFormatedDataToExport(data);
    const currentClient = clientsList?.find(
      (item) => item?.id === data?.clientId
    );

    if (!Array.isArray(body) || !body?.length || body?.length === 0) {
      toast.error('Não há dados para gerar o EXCEL.');
      return;
    }

    downloadExcel({
      fileName: `${currentClient?.name}-${new Date().toLocaleDateString()}`,
      sheet: 'react-export-table-to-excel',
      tablePayload: {
        header: Object.keys(body[0]),
        body,
      },
    });

    reset();
    setFocus('clientId');
  };

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
    reset();
  };

  return (
    <>
      <Tooltip title="Gerar EXCEL" defaultOpen={false}>
        <Button
          shape="circle"
          size="large"
          onClick={handleToggleModal}
          ref={ref}
        >
          <XlsxIcon fill={theme === 'dark' ? '#ffffffd8' : '#616161'} />
        </Button>
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
        <Styled.ClientXlsxModalContainer>
          <Alert
            message="Escolha o CLIENTE e o PERÍODO para gerar o EXCEL"
            type="info"
            showIcon
          />

          <Form
            className="content"
            onFinish={handleSubmit(handleGenerateExcel)}
          >
            <FormItem control={control} name="clientId">
              <Select
                id="clientId"
                showSearch
                placeholder="Selecione um cliente"
                optionFilterProp="label"
                label="Cliente"
                allowClear
                autoClearSearchValue
                options={clientListOptions}
              />
            </FormItem>
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
              style={{ marginTop: '3rem' }}
              id="excel-submit"
              htmlType="submit"
              type="primary"
              size="large"
              block
              loading={isSubmitting}
            >
              Gerar EXCEL
            </Button>
          </Form>
        </Styled.ClientXlsxModalContainer>
      </Modal>
    </>
  );
};

export const ClientXlsxModal = forwardRef(ClientXlsxModalBase);
