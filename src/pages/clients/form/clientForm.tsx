// Packages
import { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftOutlined as ArrowLeftOutlinedIcon } from '@ant-design/icons';
import * as zod from 'zod';

// Components
import { Form, Input, Button, Card, Row, Col } from 'components/core';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo obrigatório' }),
  registrationNumber: zod.string().min(1, { message: 'Campo obrigatório' }),
});

type FormValues = zod.infer<typeof schema>;

export const ClientForm = (): ReactElement => {
  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      name: '',
      registrationNumber: '',
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
    <Styled.ClientFormContainer className="container">
      <header className="clients__header">
        <h1>Clientes</h1>

        <Link to="/clients/new">
          <Button
            size="middle"
            shape="round"
            type="default"
            icon={<ArrowLeftOutlinedIcon />}
          >
            Voltar
          </Button>
        </Link>
      </header>

      <Form onFinish={handleSubmit(handleNewItem)} className="clients-form">
        <Card className="clients-form__fields">
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
              <FormItem control={control} name="registrationNumber">
                <Input
                  name="registrationNumber"
                  label="Documento"
                  placeholder="Documento do Cliente"
                  autoComplete="off"
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
    </Styled.ClientFormContainer>
  );
};
