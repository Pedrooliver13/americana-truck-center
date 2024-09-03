// Packages
import { ReactElement, useEffect } from 'react';
import { Divider, Empty } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Breadcrumb,
} from 'components/core';

// Hooks
import { useTasksCount } from 'hooks/tasks/useTasksCount';

// Utils
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  document: zod.string().nullable(),
  vehicle: zod.string(),
  client: zod.string().optional().nullable(),
  licensePlate: zod.string().min(1, { message: 'Campo obrigatório' }),
  washTankRadio: zod.string().min(1, { message: 'Campo obrigatório' }),
  cavaloRadio: zod.string().min(1, { message: 'Campo obrigatório' }),
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
  ];

  const data = {
    name: 'Teste',
    document: '123456789',
    vehicle: 'Carro',
    client: 'Jack',
    licensePlate: 'ABC-1234',
    washTankRadio: '100',
    cavaloRadio: '200',
  };

  const { control, handleSubmit, setFocus, watch } = useForm<FormValues>({
    defaultValues: {
      name: '',
      document: '',
      vehicle: '',
      client: null,
      licensePlate: '',
      ...Object.fromEntries(washData.map((item) => [item.name, '0'])),
    },
    values: data,
    resolver: zodResolver(schema),
  });

  const { totalPrice, totalItems, listSelected } = useTasksCount<FormValues>({
    watch,
    radioList: washData,
  });

  const handleNewItem = (data: FormValues): void => {
    console.log(data);
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <Styled.TasksFormContainer className="container">
      <Breadcrumb />

      <Form onFinish={handleSubmit(handleNewItem)} className="tasks-form">
        <Card className="tasks-form__fields">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} md={12}>
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
                <Input
                  name="document"
                  label="Documento"
                  placeholder="Documento"
                  autoComplete="off"
                  maxLength={150}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem control={control} name="vehicle">
                <Input
                  name="vehicle"
                  label="Veículo"
                  placeholder="Nome do Veículo"
                  autoComplete="off"
                  maxLength={150}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem control={control} name="licensePlate">
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  label="Placa do veículo"
                  placeholder="Placa do Veículo"
                  autoComplete="off"
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
                    <Radio value={item?.visualValue}>Visual</Radio>
                    <Radio value={'0'}>Nenhum</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            ))}
          </Row>
        </Card>

        <Card className="tasks-form__price">
          <div className="tasks-form__services">
            {listSelected.map((item) => (
              <li
                key={item.label}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <p>{item.label}</p>
                <span>{priceFormatter.format(+item.value)}</span>
              </li>
            ))}

            {totalItems <= 0 && (
              <Empty description="Nenhum serviço selecionado!" />
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
            <Button size="large" type="primary">
              Salvar
            </Button>
          </div>
        </Card>
      </Form>
    </Styled.TasksFormContainer>
  );
};
