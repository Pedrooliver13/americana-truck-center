// Packages
import { ReactElement } from 'react';
import { Divider } from 'antd';
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
  Select,
  Button,
  Card,
  Row,
  Col,
  Radio,
  RadioGroup,
} from 'components/core';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  client: zod.string().optional().nullable(),
  licensePlate: zod.string().min(1, { message: 'Campo obrigatório' }),
  description: zod.string().min(1, { message: 'Campo obrigatório' }),
  cavalo: zod.string().min(1, { message: 'Campo obrigatório' }),
});

type FormValues = zod.infer<typeof schema>;

export const TasksForm = (): ReactElement => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
      client: null,
      licensePlate: '',
      description: 'c',
      cavalo: 'c',
    },
    resolver: zodResolver(schema),
  });

  const handleNewItem = (data: FormValues) => {
    console.log(data);
  };

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
              <FormItem control={control} name="client">
                <Select
                  id="client"
                  showSearch
                  placeholder="Selecione um cliente"
                  optionFilterProp="label"
                  label="Cliente"
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
            <Divider />
            <Col xs={24} lg={12}>
              <FormItem control={control} name="description">
                <RadioGroup
                  label="Lavagem Tanque"
                  size="large"
                  buttonStyle="solid"
                >
                  <Radio value="a">Visual</Radio>
                  <Radio value="b">Completo</Radio>
                  <Radio value="c">Nenhum</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem control={control} name="cavalo">
                <RadioGroup label="Cavalo" size="large" buttonStyle="solid">
                  <Radio value="a">Visual</Radio>
                  <Radio value="b">Completo</Radio>
                  <Radio value="c">Nenhum</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        </Card>

        <Card className="tasks-form__price">
          <h1>Hello World</h1>
          <Button htmlType="submit" type="primary" size="large">
            Salvar
          </Button>
        </Card>
      </Form>
    </Styled.TasksFormContainer>
  );
};
