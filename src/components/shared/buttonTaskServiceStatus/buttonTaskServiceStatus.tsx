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
import {
  ETaskServiceStatus,
  serviceStatusName,
  Task,
} from 'models/tasks/tasks';

// Hooks
import { usePutTask } from 'hooks/tasks/usePutTask';

// Styles
import * as Styled from './styles';

interface ButtonTaskStatusProps {
  serviceStatus:
    | ETaskServiceStatus.PENDING
    | ETaskServiceStatus.COMPLETED
    | ETaskServiceStatus.CANCELED;
  record: Task;
}

const schema = zod.object({
  serviceStatus: zod.number({ message: 'Campo obrigatório' }),
});

export type FormValues = zod.infer<typeof schema>;

export const ButtonTaskServiceStatus = (
  props: ButtonTaskStatusProps
): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutateAsync: updateTaskMutate, isPending } = usePutTask();

  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      serviceStatus: props.serviceStatus,
    },
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const onChangeTaskStatus = async (data: FormValues) => {
    await updateTaskMutate({
      ...props?.record,
      serviceStatus: data.serviceStatus,
    });

    setIsOpenModal(false);
  };

  return (
    <>
      <Styled.ButtonTaskServiceStatusContainer
        icon={<div className="status" />}
        className={`btn-status-${
          props?.serviceStatus || ETaskServiceStatus.PENDING
        }`}
        size="small"
        onClick={handleToggleModal}
      >
        {serviceStatusName[props?.serviceStatus] ??
          serviceStatusName[ETaskServiceStatus.PENDING]}
        <ArrowRightOutlinedIcon />
      </Styled.ButtonTaskServiceStatusContainer>

      <Modal
        open={isOpenModal}
        centered
        title="Deseja alterar o status do serviço?"
        onCancel={handleToggleModal}
        footer={null}
      >
        <Styled.ModalContainer>
          <Typography>
            O status do serviço deste item será alterado. Tem certeza de que
            deseja continuar?
          </Typography>

          <Form onFinish={handleSubmit(onChangeTaskStatus)}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <FormItem control={control} name="serviceStatus">
                  <Select
                    id="serviceStatus"
                    showSearch
                    placeholder="Alterar o status do serviço"
                    optionFilterProp="label"
                    label="Status do serviço"
                    allowClear
                    autoClearSearchValue
                    options={[
                      {
                        label: serviceStatusName[ETaskServiceStatus.PENDING],
                        value: ETaskServiceStatus.PENDING,
                      },
                      {
                        label: serviceStatusName[ETaskServiceStatus.AWAITING],
                        value: ETaskServiceStatus.AWAITING,
                      },
                      {
                        label: serviceStatusName[ETaskServiceStatus.COMPLETED],
                        value: ETaskServiceStatus.COMPLETED,
                      },
                    ]}
                  />
                </FormItem>
              </Col>

              <Col xs={24}>
                <Button
                  id="btn-task-service-status"
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
