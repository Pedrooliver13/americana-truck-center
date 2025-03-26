// Packages
import { ReactElement, useState } from 'react';
import { ArrowRightOutlined as ArrowRightOutlinedIcon } from '@ant-design/icons';
import { Typography } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import { Button, Col, Form, Modal, Row, Select } from 'components/core';

// Models
import { ETaskStatus, statusName, Task } from 'models/tasks/tasks';

// Hooks
import { usePutTask } from 'hooks/tasks/usePutTask';

// Styles
import * as Styled from './styles';

interface ButtonTaskStatusProps {
  status: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE;
  record: Task;
}

const schema = zod.object({
  status: zod.number({ message: 'Campo obrigatório' }),
});

export type FormValues = zod.infer<typeof schema>;

export const ButtonTaskStatus = (
  props: ButtonTaskStatusProps
): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutateAsync: updateTaskMutate, isPending } = usePutTask();

  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      status: props.status,
    },
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const onChangeTaskStatus = async (data: FormValues) => {
    await updateTaskMutate({
      ...props?.record,
      status: data.status,
    });
  };

  return (
    <>
      <Styled.ButtonTaskStatusContainer
        icon={<div className="status" />}
        className={`btn-status-${props.status}`}
        size="small"
        onClick={handleToggleModal}
      >
        {statusName[props?.status] ?? statusName[ETaskStatus.INVOICE]}
        <ArrowRightOutlinedIcon />
      </Styled.ButtonTaskStatusContainer>

      <Modal
        open={isOpenModal}
        centered
        title="Deseja alterar o status do serviço?"
        onCancel={handleToggleModal}
        footer={null}
      >
        <Styled.ModalContainer>
          <Typography>
            O status deste item será alterado. Tem certeza de que deseja
            continuar?
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
