// Packages
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from 'antd';
import { MailOutlined as MailOutlinedIcon } from '@ant-design/icons';
import * as zod from 'zod';

// Components
import { LoginTemplate } from 'components/layout';
import { Form, Row, Col, Input, Button } from 'components/core';

// Hooks
import { usePasswordReset } from 'hooks/login/usePasswordReset';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  email: zod.string().email('E-mail inválido'),
});

type FormValues = zod.infer<typeof schema>;

export const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePasswordReset();

  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data: FormValues) => {
    mutate(data);
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <LoginTemplate>
      <Styled.ForgotPasswordContainer
        className="container"
        style={{ maxWidth: '400px', padding: '0 30px' }}
      >
        <div className="header">
          <h1>
            <strong>Redefinir senha!</strong>
          </h1>
          <span>Esqueceu sua senha?</span>
        </div>

        <Form className="content" onFinish={handleSubmit(handleLogin)}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} md={24}>
              <FormItem control={control} name="email">
                <Input
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  autoComplete="off"
                  required
                  prefix={<MailOutlinedIcon />}
                />
              </FormItem>
            </Col>

            <Col xs={24} md={24}>
              <Button
                className="button"
                htmlType="submit"
                type="primary"
                block
                size="large"
                loading={isPending}
              >
                Enviar e-mail
              </Button>
            </Col>
          </Row>
        </Form>

        <Divider>ou</Divider>

        <div className="footer">
          <Button
            type="text"
            htmlType="submit"
            onClick={() => navigate('/login')}
          >
            Voltar para o login
          </Button>
        </div>
      </Styled.ForgotPasswordContainer>
    </LoginTemplate>
  );
};
