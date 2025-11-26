// Packages
import { ReactElement, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { CalendarOutlined as CalendarOutlinedIcon } from '@ant-design/icons';
import { Alert, DatePicker } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import moment from 'moment';

// Components
import { Button, Col, Form, Modal, Row, Tooltip } from 'components/core';

// Hooks
import { usePutBatchTask } from 'hooks/tasks/usePutBatchTask';

// Styles
import * as Styled from './styles';

interface ButtonBatchTaskCreatedAtProps {
  selectedRows: Array<string>;
}

const schema = zod.object({
  dateValue: zod.any(),
  createdAt: zod
    .any()
    .refine((val) => val != null, { message: 'Campo obrigatório' }),
});

export type FormValues = zod.infer<typeof schema>;

export const ButtonBatchTaskCreatedAt = (
  props: ButtonBatchTaskCreatedAtProps
): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutateAsync: updateBatchTaskMutate, isPending } = usePutBatchTask();

  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    if (!Array.isArray(props.selectedRows) || !data?.dateValue) {
      return;
    }

    const dateFormatted = moment(data?.dateValue, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );

    await updateBatchTaskMutate({
      ids: props?.selectedRows,
      createdAt: Timestamp.fromDate(moment(dateFormatted).toDate()),
    }).then(() => {
      reset();
      handleToggleModal();
    });
  };

  return (
    <>
      <Tooltip title="Alterar múltiplas datas de criação">
        <Styled.ButtonTaskCreatedAtContainer
          onClick={handleToggleModal}
          className={`btn-batch-created-at`}
          size="large"
          shape="circle"
        >
          <CalendarOutlinedIcon />
        </Styled.ButtonTaskCreatedAtContainer>
      </Tooltip>

      <Modal
        open={isOpenModal}
        centered
        title="Deseja alterar a data de criação de múltiplos serviços?"
        onCancel={handleToggleModal}
        footer={null}
      >
        <Styled.ModalContainer>
          <Alert
            message={
              <>
                <strong>Atenção:</strong> Essa ação pode afetar fechamentos
                anteriores e relatórios financeiros. Certifique-se de que a nova
                data de criação está correta antes de confirmar a alteração.
              </>
            }
            type="error"
            showIcon
          />

          <Form onFinish={handleSubmit(onSubmit)}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <FormItem control={control} name="createdAt">
                  <DatePicker
                    id="createdAt"
                    size="large"
                    placeholder="Selecione a nova data de criação"
                    format={{
                      format: 'DD/MM/YYYY',
                      type: 'mask',
                    }}
                    style={{ width: '100%' }}
                    onChange={(_event, dateString) => {
                      setValue('dateValue', dateString);
                    }}
                  ></DatePicker>
                </FormItem>
              </Col>

              <Col xs={24}>
                <Button
                  id="btn-task-created-at-submit"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  disabled={isPending}
                >
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Form>
        </Styled.ModalContainer>
      </Modal>
    </>
  );
};
