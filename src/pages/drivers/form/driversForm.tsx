// Packages
import { ReactElement, useEffect } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
import { Tour } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import {
  Button,
  Card,
  Input,
  Col,
  Form,
  Row,
  Tooltip,
  Modal,
  MaskedInput,
} from 'components/core';

// Hooks
import { useDriversFormTour } from 'hooks/drivers/useDriversFormTour';
import { useDriversContext } from 'hooks/drivers/useDriversContext';

// Utils
import { Masks } from 'utils/masks';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  document: zod.string().min(1, { message: 'Campo obrigatório' }),
  email: zod
    .string()
    .email({ message: 'E-mail inválido' })
    .optional()
    .or(zod.literal('')),
  phone: zod.string(),
});

type FormValues = zod.infer<typeof schema>;

export const DriversForm = (): ReactElement => {
  const { isOpenTourState, steps, ref1, ref2 } = useDriversFormTour();

  const {
    id,
    driverItem,
    createDriver,
    updateDriver,
    onToggleModal,
    navigate,
    isOpenModal,
    isLoading,
  } = useDriversContext();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      document: '',
      email: '',
      phone: '',
    },
    values: driverItem,
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    onToggleModal();
  };

  const onSubmit = (data: FormValues) => {
    if (id) {
      updateDriver({ ...data, id });
      return;
    }

    createDriver(data);
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <>
      <Styled.DriversFormContainer className="container">
        <div className="drivers__header">
          <h1>
            {id ? 'Editar Motorista' : 'Adicionar Motorista'}
            <Tooltip title="Fazer tour da página" placement="bottom">
              <>
                <QuestionCircleOutlinedIcon
                  id="info-icon"
                  onClick={() => isOpenTourState[1](true)}
                />
              </>
            </Tooltip>
          </h1>
          <div>
            <Button onClick={handleToggleModal}>Voltar</Button>
          </div>
        </div>
        <Form onFinish={handleSubmit(onSubmit)} className="drivers-form">
          <Card className="drivers-form__fields" ref={ref1}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} md={24}>
                <FormItem control={control} name="name">
                  <Input
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Nome do Motorista"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                    required
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="document">
                  <MaskedInput
                    id="document"
                    label="RG"
                    placeholder="Documento"
                    autoComplete="off"
                    status={errors?.document ? 'error' : ''}
                    required
                    mask={[
                      {
                        mask: Masks.RG,
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="email" status={'error'}>
                  <Input
                    id="email"
                    name="email"
                    label="E-mail"
                    placeholder="E-mail"
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="phone" status={'error'}>
                  <MaskedInput
                    id="phone"
                    name="phone"
                    label="Celular"
                    placeholder="Celular"
                    status={errors?.phone ? 'error' : ''}
                    mask={[
                      {
                        mask: Masks.PHONE,
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
            <div className="drivers-form__footer" ref={ref2}>
              <Button size="large" type="default" onClick={handleToggleModal}>
                Cancelar
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
      </Styled.DriversFormContainer>
      <Tour
        open={isOpenTourState[0]}
        onClose={() => isOpenTourState[1](false)}
        steps={steps}
        zIndex={999999}
      />
      <Modal
        title="Desejar cancelar a operação?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          navigate('/drivers');
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>Após o cancelamento os dados serão descartados!</p>
      </Modal>
    </>
  );
};
