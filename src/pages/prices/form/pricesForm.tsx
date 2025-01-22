// Packages
import { ReactElement, useEffect } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { QuestionCircleOutlined as QuestionCircleOutlinedIcon } from '@ant-design/icons';
import { Tour } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import {
  Button,
  Card,
  Input,
  Col,
  Form,
  Row,
  Tooltip,
  Modal,
  InputNumber,
  Select,
} from 'components/core';

// Hooks
import { usePricesFormTour } from 'hooks/prices/usePricesFormTour';
import { usePricesContext } from 'hooks/prices/usePricesContext';

// Utils
import { convertCurrencyToNumber } from 'utils/formatter';

// Styles
import * as Styled from './styles';

const schema = zod
  .object({
    name: zod.string().min(1, { message: 'Campo obrigatório' }),
    maxValue: zod
      .string({ message: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' }),

    minValue: zod
      .string({ message: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' }),

    client: zod.string().optional().nullable(),
  })
  .superRefine((values, ctx) => {
    const minValue = convertCurrencyToNumber(values?.minValue);
    const maxValue = convertCurrencyToNumber(values?.maxValue);

    if (Number(minValue) >= Number(maxValue)) {
      ctx.addIssue({
        message: 'O Preço visual não pode ser maior ou igual ao preço completo',
        code: 'custom',
        path: ['minValue'],
      });
    }

    if (Number(minValue) < 0 || Number(maxValue) < 0) {
      ctx.addIssue({
        message: 'Os valores não podem ser negativos',
        code: 'custom',
        path: ['minValue'],
      });
    }
  });

type FormValues = zod.infer<typeof schema>;

export const PricesForm = (): ReactElement => {
  const { isOpenTourState, steps, ref1, ref2 } = usePricesFormTour();

  const {
    id,
    priceItem,
    clientsListOptions,
    createPrice,
    updatePrice,
    onToggleModal,
    navigate,
    isOpenModal,
    isLoading,
  } = usePricesContext();

  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: {
      name: '',
      maxValue: '',
      minValue: '',
      client: null,
    },
    values: priceItem,
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    onToggleModal();
  };

  const onSubmit = (data: FormValues) => {
    const preparedData = {
      ...data,
      client: data?.client || '',
    };

    if (id) {
      updatePrice({ ...preparedData, id });
      return;
    }

    createPrice(preparedData);
  };

  useEffect(() => {
    setFocus('client');
  }, [setFocus]);

  return (
    <>
      <Styled.PriceFormContainer className="container">
        <div className="prices__header">
          <h1>
            {id ? 'Editar Preço' : 'Adicionar Preço'}
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
        <Form onFinish={handleSubmit(onSubmit)} className="prices-form">
          <Card className="prices-form__fields" ref={ref1}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <FormItem control={control} name="client">
                  <Select
                    id="client"
                    showSearch
                    placeholder="Selecione um Cliente"
                    optionFilterProp="label"
                    label="Vincular Cliente"
                    allowClear
                    autoClearSearchValue
                    options={clientsListOptions}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24}>
                <FormItem control={control} name="name">
                  <Input
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Nome do Serviço"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                    required
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="minValue">
                  <InputNumber
                    id="minValue"
                    name="minValue"
                    label="Preço Visual"
                    placeholder="Preço Visual"
                    autoComplete="off"
                    required
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="maxValue">
                  <InputNumber
                    id="maxValue"
                    name="maxValue"
                    label="Preço Completo"
                    placeholder="Preço Completo"
                    autoComplete="off"
                    required
                  />
                </FormItem>
              </Col>
            </Row>
            <div className="prices-form__footer" ref={ref2}>
              <Button size="large" type="default" onClick={handleToggleModal}>
                Cancelar
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
      </Styled.PriceFormContainer>
      <Tour
        open={isOpenTourState[0]}
        onClose={() => isOpenTourState[1](false)}
        steps={steps}
        zIndex={999999}
      />
      <Modal
        title="Desejar cancelar a operação?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          navigate('/prices');
          handleToggleModal();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>Após o cancelamento os dados serão descartados!</p>
      </Modal>
    </>
  );
};
