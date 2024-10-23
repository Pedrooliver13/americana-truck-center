// Packages
import { ReactElement, useEffect, useState } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
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
import { useClientsContext } from 'hooks/clients/useClientsContext';

// Utils
import { Masks } from 'utils/masks';

// Styles
import * as Styled from './styles';
import { useClientsFormTour } from 'hooks/clients/useClientsFormTour';
import { Tour } from 'antd';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  document: zod.string().min(1, { message: 'Campo obrigatório' }),
  phone: zod.string().min(1, { message: 'Campo obrigatório' }),
  email: zod
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email('E-mail inválido'),
});

type FormValues = zod.infer<typeof schema>;

export const ClientForm = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isOpenTourState, steps, ref1, ref2 } = useClientsFormTour();

  const { id, clientItem, createClient, navigate, isLoading } =
    useClientsContext();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      document: '',
      phone: '',
      email: '',
    },
    values: clientItem,
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const onSubmit = (data: FormValues) => {
    createClient(data);
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <>
      <Styled.ClientFormContainer className="container">
        <div className="clients__header">
          <h1>
            {id ? 'Editar Cliente' : 'Adicionar Cliente'}
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
        <Form onFinish={handleSubmit(onSubmit)} className="clients-form">
          <Card className="clients-form__fields" ref={ref1}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} md={24}>
                <FormItem control={control} name="name">
                  <Input
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Nome do cliente"
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
                    label="Documento"
                    placeholder="Documento"
                    autoComplete="off"
                    firstmasklength={11}
                    status={errors?.document ? 'error' : ''}
                    mask={[
                      {
                        mask: Masks.CPF,
                        lazy: true,
                      },
                      {
                        mask: Masks.CNPJ,
                        lazy: true,
                      },
                    ]}
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
            </Row>
            <div className="clients-form__footer" ref={ref2}>
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
      </Styled.ClientFormContainer>
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
          navigate('/clients');
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>Após o cancelamento os dados serão descartados!</p>
      </Modal>
    </>
  );
};
