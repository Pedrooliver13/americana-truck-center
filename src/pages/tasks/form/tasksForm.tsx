// Packages
import { ReactElement, useEffect, useState } from 'react';
import { Divider, Empty, Tour } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
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
} from 'components/core';

// Hooks
import { useTasksCount } from 'hooks/tasks/useTasksCount';
import { usePostTask } from 'hooks/tasks/usePostTask';
import { useGetByIdTask } from 'hooks/tasks/useGetByIdTask';
import { useTaskFormTour } from 'hooks/tasks/useTaskFormTour';

// Utils
import { Masks } from 'utils/masks';
import { priceFormatter } from 'utils/formatter';

// Models
import { PostTask } from 'models/tasks/postTasks';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  phone: zod.string().min(1, { message: 'Campo obrigatório' }).nullable(),
  document: zod.string().min(1, { message: 'Campo obrigatório' }).nullable(),
  vehicle: zod.string().nullable(),
  client: zod.string().optional().nullable(),
  licensePlate: zod.string().nullable(),
});

type FormValues = zod.infer<typeof schema>;

const washData = [
  {
    id: 123,
    name: 'Lavagem Tanque',
    minValue: '100',
    maxValue: '200',
  },
  {
    id: 431,
    name: 'Lavagem Tanque 2',
    minValue: '100',
    maxValue: '200',
  },
  {
    id: 1231,
    name: 'Lavagem Teste',
    minValue: '100',
    maxValue: '200',
  },
];

export const TasksForm = (): ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetByIdTask(id);
  const { mutate, isPending } = usePostTask();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isOpenTourState, steps, ref1, ref2, ref3 } = useTaskFormTour();

  const {
    totalPrice,
    totalItems,
    listServices,
    handleChangeAddNewServiceInList,
  } = useTasksCount(data?.services ?? []);

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      document: '',
      vehicle: '',
      client: null,
      licensePlate: '',
      ...Object.fromEntries(washData.map((item) => [item.name, '0'])),
    },
    values: data,
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleNewItem = async (): Promise<void> => {
    const value = watch();

    const prepareData = {
      ...value,
      licensePlate: value.licensePlate?.toUpperCase(),
      total: totalPrice,
      services: listServices,
      createdAt: data?.createdAt ?? moment().format('YYYY-MM-DD'),
    };

    mutate(prepareData as PostTask);
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <>
      <Styled.TasksFormContainer className="container">
        <div className="tasks__header">
          <h1>
            Adicionar serviço
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
              <Col xs={24} md={24}>
                <FormItem control={control} name="name">
                  <Input
                    name="name"
                    label="Nome"
                    placeholder="Nome do Cliente"
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
                <FormItem control={control} name="vehicle">
                  <Input
                    name="vehicle"
                    label="Veículo"
                    placeholder="Modelo do Veículo"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem
                  control={control}
                  name="licensePlate"
                  className="licensePlate"
                >
                  <MaskedInput
                    id="licensePlate"
                    label="Placa do veículo"
                    placeholder="Placa do Veículo"
                    autoComplete="off"
                    mask={[
                      {
                        mask: 'aaa-0*00',
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xs={24}>
                <FormItem control={control} name="client">
                  <Select
                    id="client"
                    showSearch
                    placeholder="Selecione um cliente"
                    optionFilterProp="label"
                    label="Vincular cliente"
                    allowClear
                    autoClearSearchValue
                    options={[
                      {
                        value: 'jack',
                        label: 'Jack',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Divider />
              {washData.map((item) => (
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
                      label={item?.name}
                      id={item?.name}
                      size="large"
                      buttonStyle="solid"
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
                loading={isPending}
                disabled={Boolean(id)}
              >
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
        <Tour
          open={isOpenTourState[0]}
          onClose={() => isOpenTourState[1](false)}
          steps={steps}
          zIndex={999999}
        />
      </Styled.TasksFormContainer>
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
