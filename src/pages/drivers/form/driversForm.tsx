// Packages
import { ReactElement, useEffect } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
import { Tour } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { DefaultOptionType } from 'antd/es/select';

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
  Select,
} from 'components/core';

// Hooks
import { useDriversFormTour } from 'hooks/drivers/useDriversFormTour';
import { useDriversContext } from 'hooks/drivers/useDriversContext';

// Models
import { Clients } from 'models/clients/clients';

// Utils
import { Masks } from 'utils/masks';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  document: zod.string(),
  code: zod.string(),
  client: zod.string().optional().or(zod.literal('')),
  clientName: zod.string().optional().or(zod.literal('')),
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
    clientListOptions,
    onToggleModal,
    navigate,
    isOpenModal,
    isLoading,
  } = useDriversContext();

  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      document: '',
      client: '',
      clientName: '',
      code: '',
      email: '',
      phone: '',
    },
    values: driverItem,
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    onToggleModal();
  };

  const handleChangeClient = (
    _value: string,
    option: DefaultOptionType | DefaultOptionType[]
  ): void => {
    const clientOption = option as Clients;

    console.log('clientOption', clientOption);

    if (!clientOption) {
      return setValue('clientName', '');
    }

    setValue('clientName', clientOption?.name);
  };

  const onSubmit = (data: FormValues) => {
    const preparedData = {
      ...data,
      name: data?.name?.toUpperCase(),
    };

    if (id) {
      updateDriver({ ...preparedData, id });
      return;
    }

    createDriver(preparedData);
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
              <Col xs={24}>
                <FormItem
                  control={control}
                  name="client"
                  help="Apenas para preencher campo 'Empresa'"
                >
                  <Select
                    id="client"
                    autoFocus={Boolean(id)}
                    showSearch
                    placeholder="Selecione uma empresa"
                    optionFilterProp="label"
                    label="Selecione a Empresa"
                    allowClear
                    autoClearSearchValue
                    disabled={Boolean(id)}
                    onChange={handleChangeClient}
                    options={clientListOptions}
                  />
                </FormItem>
              </Col>
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
                    label="Documento"
                    placeholder="Documento"
                    firstmasklength={9}
                    autoComplete="off"
                    status={errors?.document ? 'error' : ''}
                    mask={[
                      {
                        mask: Masks.RG,
                        lazy: true,
                      },
                      {
                        mask: Masks.CPF,
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="code">
                  <Input
                    id="code"
                    name="code"
                    label="Matrícula"
                    placeholder="Matrícula"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="clientName" status={'error'}>
                  <Input
                    id="clientName"
                    name="clientName"
                    label="Empresa"
                    placeholder="Empresa"
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
