// Packages
import { ReactElement } from 'react';
import { Form } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import { Input, Button } from 'components/core';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Campo nome é obrigatório' }),
  teste: zod.string(),
});

type FormValues = zod.infer<typeof schema>;

export const Tasks = (): ReactElement => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { name: '', teste: '' },
    resolver: zodResolver(schema),
  });

  const handleNewItem = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Styled.TasksContainer className="container">
      <Form onFinish={handleSubmit(handleNewItem)}>
        <FormItem control={control} name="name">
          <Input placeholder="Nome" autoComplete="first-name" />
        </FormItem>
        <FormItem control={control} name="teste">
          <Input placeholder="teste" />
        </FormItem>

        <Button id="cancel-button" size="large" danger data-cy="cancel-button">
          Cancelar
        </Button>
        <Button
          id="save-button"
          type="primary"
          size="large"
          htmlType="submit"
          data-cy="save-button"
        >
          Salvar
        </Button>
      </Form>
    </Styled.TasksContainer>
  );
};
