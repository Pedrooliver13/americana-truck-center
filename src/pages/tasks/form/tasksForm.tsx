// Packages
import { ReactElement, useState } from 'react';
import { Divider, Empty, Tour } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import {
  SearchOutlined as SearchOutlinedIcon,
  QuestionCircleOutlined as QuestionCircleOutlinedIcon,
} from '@ant-design/icons';

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
  Tag,
  Modal,
  Tooltip,
  MaskedInput,
  TextArea,
} from 'components/core';

// Hooks
import { useTaskFormTour } from 'hooks/tasks/useTaskFormTour';
import { FormValues, useTaskForm } from 'hooks/tasks/useTaskForm';

// Utils
import { Masks } from 'utils/masks';
import { priceFormatter } from 'utils/formatter';

// Styles
import * as Styled from './styles';

export const TasksForm = (): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpenTourState, steps, ref1, ref2, ref3 } = useTaskFormTour();

  const {
    id,
    clientListOptions,
    driverListOptions,
    totalPrice,
    totalItems,
    listServices,
    control,
    errors,
    navigate,
    isLoading,
    handleSubmit,
    watch,
    selects: { servicesOptions },
    handlers: {
      handleChangeClient,
      handleChangeDriver,
      handleNewItem,
      handleEditItem,
      handleChangeAddNewServiceInList,
    },
  } = useTaskForm();

  const onSubmit = () => {
    if (id) {
      handleEditItem(id);
      return;
    }

    handleNewItem();
  };

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  return (
    <>
      <Styled.TasksFormContainer className="container">
        <div className="tasks__header">
          <h1>
            {id ? 'Visualizar Serviço' : 'Adicionar Serviço'}
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
        <Form onFinish={handleSubmit(onSubmit)} className="tasks-form">
          <Card className="tasks-form__fields" ref={ref1}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {!id && (
                <Col xs={24}>
                  <FormItem control={control} name="driver">
                    <Select
                      id="driver"
                      autoFocus
                      showSearch
                      placeholder="Selecione um Motorista"
                      optionFilterProp="label"
                      label="Vincular Motorista"
                      allowClear
                      autoClearSearchValue
                      disabled={Boolean(id)}
                      onChange={handleChangeDriver}
                      options={driverListOptions}
                    />
                  </FormItem>
                </Col>
              )}
              <Col xs={24}>
                <FormItem control={control} name="client">
                  <Select
                    id="client"
                    autoFocus={Boolean(id)}
                    showSearch
                    placeholder="Selecione um Cliente"
                    optionFilterProp="label"
                    label="Vincular Cliente"
                    allowClear
                    autoClearSearchValue
                    disabled={Boolean(id)}
                    onChange={handleChangeClient}
                    options={clientListOptions}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24}>
                <FormItem control={control} name="name">
                  <Input
                    id="name"
                    name="name"
                    label="Nome do Motorista"
                    placeholder="Nome do Motorista"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                    required
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="driverDocument">
                  <MaskedInput
                    id="driverDocument"
                    label="Documento"
                    placeholder="Documento"
                    autoComplete="off"
                    firstmasklength={9}
                    status={errors?.driverDocument ? 'error' : ''}
                    mask={[
                      {
                        mask: Masks.RG,
                        lazy: true,
                      },
                      {
                        mask: Masks.CPF,
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="code">
                  <Input
                    id="code"
                    name="code"
                    label="Matrícula"
                    placeholder="Matrícula"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="document">
                  <MaskedInput
                    id="document"
                    label="CPF / CNPJ da Empresa"
                    placeholder="Documento"
                    autoComplete="off"
                    firstmasklength={11}
                    status={errors?.document ? 'error' : ''}
                    mask={[
                      {
                        mask: Masks.CPF,
                        lazy: true,
                      },
                      {
                        mask: Masks.CNPJ,
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="phone" status={'error'}>
                  <MaskedInput
                    id="phone"
                    name="phone"
                    label="Celular"
                    placeholder="Celular"
                    status={errors?.phone ? 'error' : ''}
                    autoComplete="off"
                    mask={[
                      {
                        mask: Masks.PHONE,
                        lazy: true,
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="vehicle">
                  <Input
                    id="vehicle"
                    name="vehicle"
                    label="Veículo"
                    placeholder="Modelo do Veículo"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem
                  control={control}
                  name="licensePlate"
                  className="licensePlate"
                >
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    label="Placa"
                    placeholder="Placa do Veículo"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24}>
                <FormItem control={control} name="fleet" className="fleet">
                  <Input
                    name="fleet"
                    label="Frota"
                    placeholder="Frota de Veículos"
                    autoComplete="off"
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24}>
                <FormItem
                  control={control}
                  name="observation"
                  className="observation"
                >
                  <TextArea
                    id="observation"
                    name="observation"
                    label="Observação"
                    rows={4}
                    placeholder="Observação"
                    autoComplete="off"
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="serviceName">
                  <Input
                    name="serviceName"
                    label="Nome do Serviço (opcional)"
                    placeholder="Nome do Serviço"
                    autoComplete="off"
                    disabled={Boolean(id) || Boolean(watch('serviceValue'))}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="serviceValue">
                  <Input
                    id="serviceValue"
                    name="serviceValue"
                    label="Valor do Serviço (opcional)"
                    placeholder="Valor do Serviço"
                    type="number"
                    autoComplete="off"
                    disabled={Boolean(id) || !watch('serviceName')}
                    onChange={(e) => {
                      handleChangeAddNewServiceInList(e, {
                        id: watch('serviceName') + 'Manual',
                        name: watch('serviceName') || '',
                        type: 'Manual',
                        value: '12312',
                      });
                    }}
                  />
                </FormItem>
              </Col>

              <Divider />

              <Col xs={24} md={24} lg={24}>
                <FormItem control={control} name="search" className="search">
                  <Input
                    id="search"
                    name="search"
                    size="large"
                    placeholder="Pesquisar Serviço"
                    allowClear
                    autoComplete="off"
                    prefix={<SearchOutlinedIcon />}
                    onChange={() => {}}
                  />
                </FormItem>
              </Col>

              {servicesOptions?.length <= 0 && (
                <Col xs={24} md={24} lg={24}>
                  <Empty description="Nenhum preço cadastrado!" />
                </Col>
              )}

              {servicesOptions?.map((item) => (
                <Col xs={24} md={24} lg={24} key={item?.id}>
                  <FormItem
                    control={control}
                    name={item?.id as keyof FormValues}
                  >
                    <RadioGroup
                      id={item?.id}
                      label={`${item?.name} - (${item?.type}):`}
                      size="large"
                      buttonStyle="solid"
                      disabled={Boolean(id)}
                    >
                      <Radio
                        value={item?.value}
                        onChange={(e) =>
                          handleChangeAddNewServiceInList(e, item)
                        }
                      >
                        {priceFormatter.format(+item?.value).replace('R$ ', '')}
                      </Radio>
                      <Radio
                        value={'0'}
                        onChange={(e) =>
                          handleChangeAddNewServiceInList(e, item)
                        }
                      >
                        NENHUM
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
              ))}
            </Row>
          </Card>

          <Card className="tasks-form__price">
            <div className="tasks-form__services" ref={ref2}>
              <strong>Serviços Selecionados:</strong>
              {totalItems > 0 && (
                <ul>
                  {listServices.map((item) => (
                    <li key={item?.id}>
                      <p>{item?.name}</p>
                      <span>
                        <Tag color="green">
                          {priceFormatter.format(Number(item?.value) ?? 0)}
                        </Tag>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {totalItems <= 0 && (
                <Empty
                  className="tasks-form__services--empty"
                  description="Nenhum serviço selecionado!"
                />
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

            <div className="tasks-form__price--footer" ref={ref3}>
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
      </Styled.TasksFormContainer>
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
        onOk={() => navigate('/tasks')}
        okButtonProps={{ danger: true }}
      >
        <p>Após o cancelamento os dados serão descartados!</p>
      </Modal>
    </>
  );
};
