// Packages
import { ReactElement, useState } from 'react';
import { ArrowRightOutlined as ArrowRightOutlinedIcon } from '@ant-design/icons';
import { Typography } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Select,
  Tooltip,
} from 'components/core';

// Models
import { ETaskStatus, statusName } from 'models/tasks/tasks';

// Hooks
import { usePutBatchTask } from 'hooks/tasks/usePutBatchTask';

// Styles
import * as Styled from './styles';

interface ButtonBatchTaskStatusProps {
  selectedRows: Array<string>;
}

const schema = zod.object({
  status: zod.number({ message: 'Campo obrigatório' }),
});

export type FormValues = zod.infer<typeof schema>;

export const ButtonBatchTaskStatus = (
  props: ButtonBatchTaskStatusProps
): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutateAsync: updateBatchTaskMutate, isPending } = usePutBatchTask();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const onChangeTaskStatus = async (data: FormValues) => {
    if (!Array.isArray(props.selectedRows) || !data?.status) {
      return;
    }

    await updateBatchTaskMutate({
      ids: props?.selectedRows,
      status: data?.status,
    }).then(() => {
      reset();
      handleToggleModal();
    });
  };

  return (
    <>
      <Tooltip title="Alterar múltiplos status">
        <Styled.ButtonTaskStatusContainer
          onClick={handleToggleModal}
          className={`btn-batch-status`}
          size="large"
          shape="circle"
        >
          <ArrowRightOutlinedIcon />
        </Styled.ButtonTaskStatusContainer>
      </Tooltip>

      <Modal
        open={isOpenModal}
        centered
        title="Deseja alterar o status de múltiplos serviços?"
        onCancel={handleToggleModal}
        footer={null}
      >
        <Styled.ModalContainer>
          <Typography>
            Todos os status selecionados serão alterados. Tem certeza de que
            deseja continuar?
          </Typography>

          <Form onFinish={handleSubmit(onChangeTaskStatus)}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <FormItem control={control} name="status">
                  <Select
                    id="status"
                    showSearch
                    placeholder="Alterar o status"
                    optionFilterProp="label"
                    label="Status"
                    allowClear
                    autoClearSearchValue
                    options={[
                      {
                        label: statusName[ETaskStatus.PAID_OFF],
                        value: ETaskStatus.PAID_OFF,
                      },
                      {
                        label: statusName[ETaskStatus.INVOICE],
                        value: ETaskStatus.INVOICE,
                      },
                      {
                        label: statusName[ETaskStatus.RECEIVABLE],
                        value: ETaskStatus.RECEIVABLE,
                      },
                    ]}
                  />
                </FormItem>
              </Col>

              <Col xs={24}>
                <Button
                  id="btn-task-status"
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
