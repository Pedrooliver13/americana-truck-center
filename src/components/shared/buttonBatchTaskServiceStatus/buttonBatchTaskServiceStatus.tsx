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
import { ETaskServiceStatus, serviceStatusName } from 'models/tasks/tasks';

// Hooks
import { usePutBatchTask } from 'hooks/tasks/usePutBatchTask';

// Styles
import * as Styled from './styles';

interface ButtonBatchTaskServiceStatusProps {
  selectedRows: Array<string>;
}

const schema = zod.object({
  serviceStatus: zod.number({ message: 'Campo obrigatório' }),
});

export type FormValues = zod.infer<typeof schema>;

export const ButtonBatchTaskServiceStatus = (
  props: ButtonBatchTaskServiceStatusProps
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
    if (!Array.isArray(props.selectedRows) || !data?.serviceStatus) {
      return;
    }

    await updateBatchTaskMutate({
      ids: props?.selectedRows,
      serviceStatus: data?.serviceStatus,
    }).then(() => {
      reset();
      handleToggleModal();
    });
  };

  return (
    <>
      <Tooltip title="Alterar múltiplos status do serviço">
        <Styled.ButtonTaskServiceStatusContainer
          onClick={handleToggleModal}
          className={`btn-batch-service-status`}
          size="large"
          shape="circle"
        >
          <ArrowRightOutlinedIcon />
        </Styled.ButtonTaskServiceStatusContainer>
      </Tooltip>

      <Modal
        open={isOpenModal}
        centered
        title="Deseja alterar o status do serviço de múltiplos serviços?"
        onCancel={handleToggleModal}
        footer={null}
      >
        <Styled.ModalContainer>
          <Typography>
            Todos os status de serviço selecionados serão alterados. Tem certeza
            de que deseja continuar?
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
