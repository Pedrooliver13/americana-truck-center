// Packages
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from 'antd';
import * as zod from 'zod';
import {
  MailOutlined as MailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Form, Row, Col, Input, InputPassword, Button } from 'components/core';

// Assets
import LogoImage from 'assets/truck-center.png';
import BackgroundImage from 'assets/background.svg';

// Hooks
import { useSignIn } from 'hooks/login/useSignIn';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  email: zod.string().email('E-mail inválido'),
  password: zod.string().min(6, 'Senha Inválida'),
});

type FormValues = zod.infer<typeof schema>;

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignIn();

  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
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
    <Styled.LoginContainer>
      <div className="background">
        <img src={LogoImage} className="background__logo" />
        <img src={BackgroundImage} className="background__generic-01" />
        <img src={BackgroundImage} className="background__generic-02" />
      </div>

      <div className="login container">
        <div className="login__header">
          <h1>
            <strong>Olá!</strong>
          </h1>
          <span style={{ fontWeight: 'lighter' }}>Bem-vindo de volta!</span>
        </div>

        <Form className="login__content" onFinish={handleSubmit(handleLogin)}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} md={24}>
              <FormItem control={control} name="email">
                <Input
                  name="email"
                  placeholder="E-mail"
                  autoComplete="off"
                  required
                  prefix={<MailOutlinedIcon />}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={24}>
              <FormItem control={control} name="password">
                <InputPassword
                  name="password"
                  placeholder="Senha"
                  autoComplete="off"
                  required
                  prefix={<LockOutlinedIcon />}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={24}>
              <Button
                className="login__button"
                htmlType="submit"
                type="primary"
                block
                size="large"
                loading={isPending}
              >
                Entrar
              </Button>
            </Col>
          </Row>
        </Form>

        <Divider>ou</Divider>

        <div className="login__footer">
          <Button type="text" onClick={() => navigate('/forgot-password')}>
            Esqueceu sua senha?
          </Button>
        </div>
      </div>
    </Styled.LoginContainer>
  );
};
