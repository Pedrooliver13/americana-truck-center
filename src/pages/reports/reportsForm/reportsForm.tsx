// Packages
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Typography } from 'antd';
import * as zod from 'zod';
import { DefaultOptionType } from 'antd/es/select';

// Components
import {
  Input,
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Select,
} from 'components/core';

// Hooks
import { useGetAllClients } from 'hooks/clients/useGetAllClients';

// Pdfs
import { generateHygieneCertificate } from 'pdfs/hygieneCertificatePdf';

// Models
import { Clients } from 'models/clients/clients';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  client: zod.string().optional(),
  hygieneCertificateDate: zod.any(),
  reviewDate: zod.any(),
  socialName: zod.string(),
  truck: zod.string(),
  tank: zod.string(),
  capacity: zod.string(),
  driverName: zod.string(),
  lastProduct: zod.string(),
  pernultimateProduct: zod.string(),
  antepernultimateProduct: zod.string(),
  visitMouth: zod.string(),
  respiring: zod.string(),
  dischargeValve: zod.string(),
  pressureWatch: zod.string(),
  hoseHolder: zod.string(),
  drainValve: zod.string(),
  strangeBody: zod.string(),
  suitability: zod.string(),
  presenceOfLiquids: zod.string(),
  odors: zod.string(),
  washingExecution: zod.string(),
  inspectorChoice: zod.string(),
  detergentUsed: zod.string(),
  temperatureRinse: zod.string(),
  temperatureWashing: zod.string(),
});

type FormValues = zod.infer<typeof schema>;

export const ReportsForm = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: clientsList, isFetching: isFetchingClientsList } =
    useGetAllClients();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      client: '',
      hygieneCertificateDate: '',
      reviewDate: '',
      socialName: '',
      truck: '',
      tank: '',
      capacity: '',
      driverName: '',
      lastProduct: '',
      pernultimateProduct: '',
      antepernultimateProduct: '',
      visitMouth: '',
      respiring: '',
      dischargeValve: '',
      pressureWatch: '',
      hoseHolder: '',
      drainValve: '',
      strangeBody: '',
      suitability: '',
      presenceOfLiquids: '',
      odors: '',
      washingExecution: '',
      inspectorChoice: '',
      detergentUsed: '',
      temperatureRinse: '',
      temperatureWashing: '',
    },
    resolver: zodResolver(schema),
  });

  const clientListOptions = useMemo(() => {
    if (!Array.isArray(clientsList)) {
      return [];
    }

    return clientsList?.map((item) => {
      return {
        ...item,
        label: item?.name,
        value: item?.id,
      };
    });
  }, [clientsList]);

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleClearFields = () => {
    localStorage.removeItem('@americana-truck-center:hygieneCertificate');
    reset();
  };

  const handleChangeClient = (
    _value: string,
    option: DefaultOptionType | DefaultOptionType[]
  ): void => {
    const clientOption = option as Clients;

    if (!clientOption) {
      return setValue('client', '');
    }

    setValue('socialName', clientOption?.name);
    clearErrors('socialName');
  };
  const onSubmit = (data: FormValues) => {
    generateHygieneCertificate(data);

    delete data.hygieneCertificateDate;
    delete data.reviewDate;
    delete data?.client;

    localStorage.setItem(
      '@americana-truck-center:hygieneCertificate',
      JSON.stringify(data)
    );
  };

  useEffect(() => {
    if (localStorage.getItem('@americana-truck-center:hygieneCertificate')) {
      const storedData = JSON.parse(
        localStorage.getItem('@americana-truck-center:hygieneCertificate') ||
          '{}'
      );

      Object.entries(storedData).forEach(([key, value]) => {
        return setValue(key as keyof FormValues, value as string);
      });
    }
  }, [setValue]);

  return (
    <>
      <Styled.ReportsFormContainer className="container">
        <div className="prices__header">
          <h1>Gerar Laudo</h1>
          <div>
            <Button onClick={handleToggleModal}>Limpar campos</Button>
          </div>
        </div>
        <Form onFinish={handleSubmit(onSubmit)} className="prices-form">
          <Card className="prices-form__fields">
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
                    onChange={handleChangeClient}
                    options={clientListOptions}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="hygieneCertificateDate">
                  <div>
                    <label htmlFor="hygieneCertificateDate">
                      <Typography.Title level={5} className="label">
                        Data Higienização *
                      </Typography.Title>
                    </label>

                    <DatePicker
                      style={{ width: '100%' }}
                      id="hygieneCertificateDate"
                      name="hygieneCertificateDate"
                      placeholder="Data Higienização"
                      autoComplete="off"
                      size="large"
                      format={{
                        format: 'DD/MM/YYYY',
                        type: 'mask',
                      }}
                      onChange={(_date, dateString) => {
                        setValue(
                          'hygieneCertificateDate',
                          Array.isArray(dateString) ? dateString[0] : dateString
                        );
                      }}
                    />
                  </div>
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="reviewDate">
                  <div>
                    <label htmlFor={'reviewDate'}>
                      <Typography.Title level={5} className="label">
                        Data de Revisão *
                      </Typography.Title>
                    </label>

                    <DatePicker
                      style={{ width: '100%' }}
                      id="reviewDate"
                      name="reviewDate"
                      placeholder="Data Revisão"
                      autoComplete="off"
                      size="large"
                      format={{
                        format: 'DD/MM/YYYY',
                        type: 'mask',
                      }}
                      onChange={(_date, dateString) => {
                        setValue(
                          'reviewDate',
                          Array.isArray(dateString) ? dateString[0] : dateString
                        );
                      }}
                    />
                  </div>
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="socialName">
                  <Input
                    id="socialName"
                    name="socialName"
                    label="Razão Social"
                    placeholder="Razão Social"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="truck">
                  <Input
                    id="truck"
                    name="truck"
                    label="Cavalo/Truck"
                    placeholder="Cavalo/Truck"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="tank">
                  <Input
                    id="tank"
                    name="tank"
                    label="Carreta/Tanque"
                    placeholder="Carreta/Tanque"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="capacity">
                  <Input
                    id="capacity"
                    name="capacity"
                    label="Capacidade (M³)"
                    placeholder="Capacidade (M³)"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="driverName">
                  <Input
                    id="driverName"
                    name="driverName"
                    label="Condutor"
                    placeholder="Condutor"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="lastProduct">
                  <Input
                    id="lastProduct"
                    name="lastProduct"
                    label="Último"
                    placeholder="Último"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="pernultimateProduct">
                  <Input
                    id="pernultimateProduct"
                    name="pernultimateProduct"
                    label="Penúltimo"
                    placeholder="Penúltimo"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="antepernultimateProduct">
                  <Input
                    id="antepernultimateProduct"
                    name="antepernultimateProduct"
                    label="Antepenúltimo"
                    placeholder="Antepenúltimo"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="visitMouth">
                  <Input
                    id="visitMouth"
                    name="visitMouth"
                    label="Boca de Visita"
                    placeholder="Boca de Visita"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="respiring">
                  <Input
                    id="respiring"
                    name="respiring"
                    label="Respiro"
                    placeholder="Respiro"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="dischargeValve">
                  <Input
                    id="dischargeValve"
                    name="dischargeValve"
                    label="Válvula de Descarga"
                    placeholder="Válvula de Descarga"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="pressureWatch">
                  <Input
                    id="pressureWatch"
                    name="pressureWatch"
                    label="Relógio de Pressão"
                    placeholder="Relógio de Pressão"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="hoseHolder">
                  <Input
                    id="hoseHolder"
                    name="hoseHolder"
                    label="Suporte do Mangote"
                    placeholder="Suporte do Mangote"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="drainValve">
                  <Input
                    id="drainValve"
                    name="drainValve"
                    label="Válvula do Dreno"
                    placeholder="Válvula do Dreno"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="strangeBody">
                  <Input
                    id="strangeBody"
                    name="strangeBody"
                    label="Corpo Estranho"
                    placeholder="Corpo Estranho"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="suitability">
                  <Input
                    id="suitability"
                    name="suitability"
                    label="Sujidade"
                    placeholder="Sujidade"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="presenceOfLiquids">
                  <Input
                    id="presenceOfLiquids"
                    name="presenceOfLiquids"
                    label="Presença de Água / Líquidos"
                    placeholder="Presença de Água / Líquidos"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="odors">
                  <Input
                    id="odors"
                    name="odors"
                    label="Odores"
                    placeholder="Odores"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="washingExecution">
                  <Input
                    id="washingExecution"
                    name="washingExecution"
                    label="Execução da Lavagem"
                    placeholder="Execução da Lavagem"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="inspectorChoice">
                  <Input
                    id="inspectorChoice"
                    name="inspectorChoice"
                    label="Escolha do Inspetor"
                    placeholder="Escolha do Inspetor"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="detergentUsed">
                  <Input
                    id="detergentUsed"
                    name="detergentUsed"
                    label="Detergente Utilizado"
                    placeholder="Detergente Utilizado"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="temperatureRinse">
                  <Input
                    id="temperatureRinse"
                    name="temperatureRinse"
                    label="Temperatura Água (Enxague)"
                    placeholder="Temperatura Água (Enxague)"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="temperatureWashing">
                  <Input
                    id="temperatureWashing"
                    name="temperatureWashing"
                    label="Temperatura Água (Lavagem)"
                    placeholder="Temperatura Água (Lavagem)"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
            </Row>
            <div className="prices-form__footer">
              <Button size="large" type="default" onClick={handleToggleModal}>
                Limpar campos
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                disabled={isSubmitting || isFetchingClientsList}
              >
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
      </Styled.ReportsFormContainer>
      <Modal
        title="Desejar limpar os campos?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => {
          handleToggleModal();
          handleClearFields();
        }}
        okButtonProps={{ danger: true }}
      >
        <p>Após confirmar os dados serão descartados!</p>
      </Modal>
    </>
  );
};
