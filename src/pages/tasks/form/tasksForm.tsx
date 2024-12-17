// Packages
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Divider, Empty, Tour } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { DefaultOptionType } from 'antd/es/select';
import moment from 'moment';
import * as zod from 'zod';

// Components
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Radio,
  RadioGroup,
  Select,
  Tag,
  Modal,
  Tooltip,
  MaskedInput,
  TextArea,
} from 'components/core';

// Hooks
import { useTasksCount } from 'hooks/tasks/useTasksCount';
import { useTaskFormTour } from 'hooks/tasks/useTaskFormTour';
import { useTasksContext } from 'hooks/tasks/useTasksContext';

// Utils
import { Masks } from 'utils/masks';
import { priceFormatter } from 'utils/formatter';

// Models
import { PostTask } from 'models/tasks/tasks';
import { Clients } from 'models/clients/clients';
import { Drivers } from 'models/drivers/drivers';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  phone: zod.string().nullable(),
  driverDocument: zod
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .nullable(),
  document: zod.string().min(1, { message: 'Campo obrigatório' }).nullable(),
  vehicle: zod.string().nullable(),
  client: zod.string().optional().nullable(),
  driver: zod.string().optional().nullable(),
  licensePlate: zod.string().nullable(),
  observation: zod.string().optional().nullable(),
});

type FormValues = zod.infer<typeof schema>;

export const TasksForm = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpenTourState, steps, ref1, ref2, ref3 } = useTaskFormTour();

  const {
    id,
    navigate,
    pricesList,
    clientListOptions,
    driverListOptions,
    taskItem,
    createTask,
    isLoading,
  } = useTasksContext();

  const {
    totalPrice,
    totalItems,
    listServices,
    setServicesSelectedList,
    handleChangeAddNewServiceInList,
  } = useTasksCount(taskItem?.services ?? []);

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      driverDocument: '',
      document: '',
      vehicle: '',
      client: null,
      driver: null,
      licensePlate: '',
      observation: '',
    },
    values: taskItem,
    resolver: zodResolver(schema),
  });

  const client = watch('client');

  const servicesOptions = useMemo(() => {
    const services = taskItem?.services ?? pricesList ?? [];

    if (!id) {
      // ? preenche os campos com 0 quando for adicionar uma nova tarefa
      services?.forEach((item) => {
        setValue(item?.name as keyof FormValues, '0');
      });
    }

    if (!client) {
      return services.filter((service) => !service?.client);
    }

    return services.filter(
      (service) => client === service?.client || !service?.client || !client
    );
  }, [taskItem?.services, pricesList, id, setValue, client]);

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleChangeClient = (
    _value: string,
    option: DefaultOptionType | DefaultOptionType[]
  ): void => {
    const clientOption = option as Clients;
    setServicesSelectedList([]);

    if (!clientOption) {
      return setValue('client', '');
    }

    servicesOptions?.forEach((item) => {
      setValue(item?.name as keyof FormValues, '0');
    });

    setValue('document', clientOption?.document);
    setFocus('vehicle');
  };

  const handleChangeDriver = (
    _value: string,
    option: DefaultOptionType | DefaultOptionType[]
  ): void => {
    const driverOption = option as Drivers;

    if (!driverOption) {
      return setValue('driver', '');
    }

    setValue('name', driverOption?.name);
    setValue('phone', driverOption?.phone);
    setValue('driverDocument', driverOption?.document);
    setFocus('client');
  };

  const handleNewItem = async (): Promise<void> => {
    const value = watch();

    if (listServices.length <= 0) {
      toast.error('Selecione ao menos um serviço!');
      return;
    }

    const prepareData = {
      ...value,
      licensePlate: value?.licensePlate?.toUpperCase(),
      total: totalPrice,
      services: listServices,
      createdAt: taskItem?.createdAt ?? moment().format('YYYY-MM-DD'),
    };

    createTask(prepareData as PostTask);
  };

  useEffect(() => {
    setFocus('driver');
  }, [setFocus]);

  return (
    <>
      <Styled.TasksFormContainer className="container">
        <div className="tasks__header">
          <h1>
            {id ? 'Visualizar Serviço' : 'Adicionar Serviço'}
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
        <Form onFinish={handleSubmit(handleNewItem)} className="tasks-form">
          <Card className="tasks-form__fields" ref={ref1}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {!id && (
                <Col xs={24}>
                  <FormItem control={control} name="driver">
                    <Select
                      id="driver"
                      showSearch
                      placeholder="Selecione um Motorista"
                      optionFilterProp="label"
                      label="Vincular Motorista"
                      allowClear
                      autoClearSearchValue
                      disabled={Boolean(id)}
                      onChange={handleChangeDriver}
                      options={driverListOptions}
                    />
                  </FormItem>
                </Col>
              )}
              <Col xs={24}>
                <FormItem control={control} name="client">
                  <Select
                    id="client"
                    showSearch
                    placeholder="Selecione um Cliente"
                    optionFilterProp="label"
                    label="Vincular Cliente"
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
                    name="name"
                    label="Nome do Motorista"
                    placeholder="Nome do Motorista"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                    required
                    disabled={Boolean(id)}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="driverDocument">
                  <MaskedInput
                    id="driverDocument"
                    label="RG do Motorista"
                    placeholder="Documento"
                    autoComplete="off"
                    firstmasklength={11}
                    disabled={Boolean(id)}
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
                <FormItem control={control} name="document">
                  <MaskedInput
                    id="document"
                    label="CPF / CNPJ da Empresa"
                    placeholder="Documento"
                    autoComplete="off"
                    firstmasklength={11}
                    disabled={Boolean(id)}
                    status={errors?.document ? 'error' : ''}
                    required
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
                    disabled={Boolean(id)}
                    status={errors?.phone ? 'error' : ''}
                    autoComplete="off"
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
                <FormItem control={control} name="vehicle">
                  <Input
                    name="vehicle"
                    label="Veículo"
                    placeholder="Modelo do Veículo"
                    autoComplete="off"
                    maxLength={150}
                    disabled={Boolean(id)}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem
                  control={control}
                  name="licensePlate"
                  className="licensePlate"
                >
                  <Input
                    name="licensePlate"
                    label="Placa / Frota"
                    placeholder="Placa do Veículo"
                    autoComplete="off"
                    disabled={Boolean(id)}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={24}>
                <FormItem
                  control={control}
                  name="observation"
                  className="observation"
                >
                  <TextArea
                    name="observation"
                    label="Observação"
                    rows={4}
                    placeholder="Observação"
                    autoComplete="off"
                    disabled={Boolean(id)}
                  />
                </FormItem>
              </Col>

              <Divider />

              {servicesOptions?.length <= 0 && (
                <Col xs={24} md={24} lg={24}>
                  <Empty description="Nenhum preço cadastrado!" />
                </Col>
              )}

              {servicesOptions?.map((item) => (
                <Col
                  xs={24}
                  md={24}
                  lg={24}
                  key={item?.name}
                  style={{ marginBottom: '5px' }}
                >
                  <FormItem
                    control={control}
                    name={item?.name as keyof FormValues}
                  >
                    <RadioGroup
                      label={`${item?.name}:`}
                      id={item?.name}
                      size="large"
                      buttonStyle="solid"
                      disabled={Boolean(id)}
                    >
                      <Radio
                        value={item?.maxValue}
                        onChange={(e) =>
                          handleChangeAddNewServiceInList(e, item)
                        }
                      >
                        Completo:{' '}
                        {priceFormatter
                          .format(+item?.maxValue)
                          .replace('R$ ', '')}
                      </Radio>
                      <Radio
                        value={item?.minValue}
                        onChange={(e) =>
                          handleChangeAddNewServiceInList(e, item)
                        }
                      >
                        VISUAL:{' '}
                        {priceFormatter
                          .format(+item?.minValue)
                          .replace('R$ ', '')}
                      </Radio>
                      <Radio
                        value={'0'}
                        onChange={(e) =>
                          handleChangeAddNewServiceInList(e, item)
                        }
                      >
                        Nenhum
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
              ))}
            </Row>
          </Card>

          <Card className="tasks-form__price">
            <div className="tasks-form__services" ref={ref2}>
              <strong>Serviços Selecionados:</strong>
              {totalItems > 0 && (
                <ul>
                  {listServices.map((item) => (
                    <li key={item?.id}>
                      <p>{item?.name}</p>
                      <span>
                        <Tag color="green">
                          {priceFormatter.format(Number(item?.value) ?? 0)}
                        </Tag>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {totalItems <= 0 && (
                <Empty
                  className="tasks-form__services--empty"
                  description="Nenhum serviço selecionado!"
                />
              )}
            </div>

            <div className="tasks-form__price--content">
              <div>
                <p>Total de itens:</p>
                <span>{totalItems}</span>
              </div>

              <div className="form__content--total">
                <p>Total:</p>
                <span>{priceFormatter.format(totalPrice)}</span>
              </div>
            </div>

            <div className="tasks-form__price--footer" ref={ref3}>
              <Button size="large" type="default" onClick={handleToggleModal}>
                Cancelar
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={Boolean(id)}
              >
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
      </Styled.TasksFormContainer>
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
        onOk={() => navigate('/tasks')}
        okButtonProps={{ danger: true }}
      >
        <p>Após o cancelamento os dados serão descartados!</p>
      </Modal>
    </>
  );
};
