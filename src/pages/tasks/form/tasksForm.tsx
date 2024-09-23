// Packages
import { ReactElement, useEffect, useState } from 'react';
import { Divider, Empty } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
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

// Utils
import { Masks } from 'utils/masks';
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  phone: zod.string().min(1, { message: 'Campo obrigatório' }).nullable(),
  document: zod.string().nullable(),
  vehicle: zod.string().nullable(),
  client: zod.string().optional().nullable(),
  licensePlate: zod.string().nullable(),
});

type FormValues = zod.infer<typeof schema>;

export const TasksForm = (): ReactElement => {
  const washData = [
    {
      name: 'washTankRadio',
      label: 'Lavagem Tanque',
      visualValue: '100',
      completeValue: '200',
    },
    {
      name: 'cavaloRadio',
      label: 'Lavagem Tanque 2',
      visualValue: '100',
      completeValue: '200',
    },
    {
      name: 'teste',
      label: 'Lavagem Teste',
      visualValue: '100',
      completeValue: '200',
    },
    {
      name: 'teste2',
      label: 'Lavagem Teste3',
      visualValue: '100',
      completeValue: '200',
    },
  ];

  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

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
    resolver: zodResolver(schema),
  });

  const { totalPrice, totalItems, listSelected } = useTasksCount<FormValues>({
    watch,
    radioList: washData,
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleNewItem = (): void => {
    const value = watch();
    console.log(value);
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
                <QuestionCircleOutlinedIcon id="info-icon" />
              </>
            </Tooltip>
          </h1>
          <div>
            <Button onClick={handleToggleModal}>Voltar</Button>
          </div>
        </div>

        <Form onFinish={handleSubmit(handleNewItem)} className="tasks-form">
          <Card className="tasks-form__fields">
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
                <FormItem control={control} name="licensePlate">
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
                <Col xs={24} md={24} lg={12} key={item?.name}>
                  <FormItem
                    control={control}
                    name={item?.name as keyof FormValues}
                  >
                    <RadioGroup
                      label={item?.label}
                      id={item?.name}
                      size="large"
                      buttonStyle="solid"
                    >
                      <Radio value={item?.completeValue}>Completo</Radio>
                      <Radio
                        value={{
                          service: item?.name,
                          value: item?.visualValue,
                        }}
                      >
                        Visual
                      </Radio>
                      <Radio value={'0'}>Nenhum</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
              ))}
            </Row>
          </Card>

          <Card className="tasks-form__price">
            <div className="tasks-form__services">
              <strong>Serviços Selecionados:</strong>
              {totalItems > 0 && (
                <>
                  <ul>
                    {listSelected.map((item) => (
                      <li key={item.label}>
                        <p>{item.label}</p>
                        <span>
                          <Tag color="green">
                            {priceFormatter.format(+item.value)}
                          </Tag>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
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

            <div className="tasks-form__price--footer">
              <Button size="large" type="default" onClick={handleToggleModal}>
                Cancelar
              </Button>
              <Button size="large" type="primary" htmlType="submit">
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
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
