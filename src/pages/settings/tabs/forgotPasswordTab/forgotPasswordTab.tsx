// Packages
import { ReactElement, useEffect } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { MailOutlined as MailOutlinedIcon } from '@ant-design/icons';
import { Alert } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import { Button, Card, Col, Form, Input, Row } from 'components/core';

// Hooks
import { usePasswordReset } from 'hooks/login/usePasswordReset';

// Contexts
import { useAuth } from 'contexts/authContext';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  email: zod.string().email('E-mail inválido'),
});

type FormValues = zod.infer<typeof schema>;

export const ForgotPasswordTab = (): ReactElement => {
  const { currentUser } = useAuth();
  const { mutate, isPending } = usePasswordReset({ notNavigate: true });

  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      email: currentUser?.email ?? '',
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
    <Card>
      <Styled.ForgotPasswordContainer>
        <div className="header">
          <h1>
            <strong>Redefinir senha!</strong>
          </h1>
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
                  disabled={Boolean(currentUser?.email)}
                  prefix={<MailOutlinedIcon />}
                />
              </FormItem>
            </Col>

            <Col xs={24} md={24} style={{}}>
              <Alert
                message="O link para alterar a senha será enviado para o e-mail cadastrado."
                type="info"
                showIcon
              />
            </Col>

            <Col xs={24} md={24} className="content__footer">
              <Button
                className="button"
                htmlType="submit"
                type="primary"
                size="large"
                loading={isPending}
              >
                Enviar e-mail
              </Button>
            </Col>
          </Row>
        </Form>
      </Styled.ForgotPasswordContainer>
    </Card>
  );
};
