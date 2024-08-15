// Packages
import { ReactElement, useEffect } from 'react';
import { Divider, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftOutlined as ArrowLeftOutlinedIcon } from '@ant-design/icons';
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
} from 'components/core';

// Utils
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  client: zod.string().optional().nullable(),
  licensePlate: zod.string().min(1, { message: 'Campo obrigatório' }),
  washTankRadio: zod.string().min(1, { message: 'Campo obrigatório' }),
  cavaloRadio: zod.string().min(1, { message: 'Campo obrigatório' }),
});

type FormValues = zod.infer<typeof schema>;

export const TasksForm = (): ReactElement => {
  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      name: '',
      client: null,
      licensePlate: '',
      washTankRadio: '0',
      cavaloRadio: '0',
    },
    resolver: zodResolver(schema),
  });

  const handleNewItem = (data: FormValues) => {
    console.log(data);
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <Styled.TasksFormContainer className="container">
      <header className="tasks__header">
        <Link to={'/tasks'}>
          <Button
            type="dashed"
            size="middle"
            icon={<ArrowLeftOutlinedIcon size={10} />}
          />
        </Link>
      </header>

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
            <Col xs={24} md={24}>
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
            <Col xs={24} lg={12}>
              <FormItem control={control} name="washTankRadio">
                <RadioGroup
                  label="Lavagem Tanque"
                  size="large"
                  buttonStyle="solid"
                >
                  <Radio value="100">Visual</Radio>
                  <Radio value="200">Completo</Radio>
                  <Radio value="0">Nenhum</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem control={control} name="cavaloRadio">
                <RadioGroup label="Cavalo" size="large" buttonStyle="solid">
                  <Radio value="100">Visual</Radio>
                  <Radio value="200">Completo</Radio>
                  <Radio value="0">Nenhum</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        </Card>

        <Card className="tasks-form__price">
          <div className="tasks-form__services">
            <Empty description="Nenhum serviço selecionado!" />
          </div>

          <div className="tasks-form__price--content">
            <div>
              <p>Total de itens</p>
              <span>{0}</span>
            </div>

            <div className="form__content--total">
              <p>Total</p>
              <span>{priceFormatter.format(0)}</span>
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
