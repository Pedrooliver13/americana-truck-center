// Packages
import { ReactElement, useState } from 'react';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Divider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DefaultOptionType } from 'antd/es/select';
import moment from 'moment';
import * as zod from 'zod';

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
  Radio,
  RadioGroup,
} from 'components/core';

// Hooks
import { useReportsContext } from 'hooks/reports/useReportsContext';

// Models
import { Clients } from 'models/clients/clients';

// Styles
import * as Styled from './styles';

const schema = zod.object({
  /* DADOS DO CLIENTE */
  client: zod.string().optional(),
  driver: zod.string().optional(),
  socialName: zod.string(),
  driverName: zod.string(),
  truck: zod.string(),
  tank: zod.string(),
  sanitarySurveillance: zod.string().optional(),
  adapterNeedsToBeCleaned: zod.string().optional(),
  /* DADOS DO CLIENTE */

  /* CHECKLIST */
  clothsUsed: zod.string(),
  returnedCloths: zod.string(),

  capsUsed: zod.string(),
  returnedCaps: zod.string(),

  glovesUsed: zod.string(),
  returnedGloves: zod.string(),

  bootsUsed: zod.string(),
  returnedBoots: zod.string(),

  flashlightsUsed: zod.string(),
  returnedFlashlights: zod.string(),

  pliersUsed: zod.string(),
  returnedPliers: zod.string(),

  ladderUsed: zod.string(),
  returnedLadder: zod.string(),

  temperatureCheck: zod.string(),
  timeCheck: zod.string(),
  valveLeakTest: zod.string(),
  phTest: zod.string(),
  /* /CHECKLIST */

  /* LACRES */
  visitMouth: zod.string(),
  securityValveVisitMouth: zod.string(),
  manometer: zod.string(),
  /* /LACRES */

  /* PH */
  mounthDischargePH: zod.string(),
  hoseHolderPH: zod.string(),
  /* /PH */

  /* ÚLTIMOS PRODUTOS TRANSPORTADOS */
  lastProduct: zod.string(),
  pernultimateProduct: zod.string(),
  antepernultimateProduct: zod.string(),
  hoseSuitability: zod.string(),
  damagedHose: zod.string(),
  /* /ÚLTIMOS PRODUTOS TRANSPORTADOS */

  /* LIMPEZA EXTERNA */
  valves: zod.string(),
  hoseExternal: zod.string(),
  pipesExternal: zod.string(),
  /* /LIMPEZA EXTERNA */

  /* AVALIAÇÃO - APÓS HIGIENIZAÇÃO */
  strangeBody: zod.string(),
  odors: zod.string(),
  presenceOfLiquids: zod.string(),
  suitability: zod.string(),
  hoseHolder: zod.string(),
  /* /AVALIAÇÃO - APÓS HIGIENIZAÇÃO */

  hygieneCertificateDate: zod.any(),
  review: zod.string(),
  capacity: zod.string(),
  dischargeValve: zod.string(),
  drainValve: zod.string(),
  detergentUsed: zod.string(),
  temperatureRinse: zod.string(),
  temperatureWashing: zod.string(),
});

type FormValues = zod.infer<typeof schema>;

export const ReportsForm = (): ReactElement => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { createReport, clientsListOptions, driverListOptions, isLoading } =
    useReportsContext();

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      /* DADOS DO CLIENTE */
      client: '',
      driver: '',
      truck: '',
      tank: '',
      sanitarySurveillance: 'NÃO',
      adapterNeedsToBeCleaned: 'NÃO',
      /* /DADOS DO CLIENTE */

      /* CHECKLIST */
      clothsUsed: '',
      returnedCloths: '',
      capsUsed: '',
      returnedCaps: '',
      glovesUsed: '',
      returnedGloves: '',
      bootsUsed: '',
      returnedBoots: '',
      flashlightsUsed: '',
      returnedFlashlights: '',
      pliersUsed: '',
      returnedPliers: '',
      ladderUsed: '',
      returnedLadder: '',
      temperatureCheck: '',
      timeCheck: '',
      valveLeakTest: 'REPROVADO',
      phTest: 'REPROVADO',
      /* /CHECKLIST */

      /* LACRES */
      visitMouth: '',
      securityValveVisitMouth: '',
      manometer: '',
      drainValve: '',
      /* /LACRES */

      /* PH */
      mounthDischargePH: '',
      hoseHolderPH: '',
      /* /PH */

      /* ÚLTIMOS PRODUTOS TRANSPORTADOS */
      lastProduct: '',
      pernultimateProduct: '',
      antepernultimateProduct: '',
      /* /ÚLTIMOS PRODUTOS TRANSPORTADOS */

      /* LIMPEZA EXTERNA */
      valves: 'NÃO',
      hoseExternal: 'NÃO',
      pipesExternal: 'NÃO',
      /* /LIMPEZA EXTERNA */

      /* AVALIAÇÃO - APÓS HIGIENIZAÇÃO */
      strangeBody: 'AUSENTE',
      suitability: 'AUSENTE',
      presenceOfLiquids: 'AUSENTE',
      odors: 'AUSENTE',
      hoseSuitability: 'AUSENTE',
      damagedHose: 'AUSENTE',
      /* /AVALIAÇÃO - APÓS HIGIENIZAÇÃO */

      hygieneCertificateDate: '',
      review: '1',
      socialName: '',
      capacity: '',
      driverName: '',
      dischargeValve: '',
      hoseHolder: '',
      detergentUsed:
        'INSPECTOR’S CHOICE(DETERGENTE NEUTRO DE GRAU ALIMENTÍCIO)',
      temperatureRinse: '60º',
      temperatureWashing: '60º',
    },
    resolver: zodResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpenModal((state) => !state);
  };

  const handleChangeClient = (
    _value: string,
    option: DefaultOptionType | DefaultOptionType[],
  ): void => {
    const clientOption = option as Clients;

    if (!clientOption) {
      return setValue('client', '');
    }

    setValue('socialName', clientOption?.name);
    clearErrors('socialName');
  };

  const handleChangeDriver = (
    _value: string,
    option: DefaultOptionType | DefaultOptionType[],
  ): void => {
    const driverOption = option as Clients;

    if (!driverOption) {
      return setValue('driver', '');
    }

    setValue('driverName', driverOption?.name);
    clearErrors('driverName');
  };

  function generateNumericId() {
    return String(
      parseInt(crypto.randomUUID().replace(/\D/g, '').slice(0, 15), 10),
    ).substring(0, 5);
  }

  const onSubmit = (data: FormValues) => {
    createReport({
      ...data,
      reportId: generateNumericId(),

      hygieneCertificateDate: data?.hygieneCertificateDate
        ? moment(data?.hygieneCertificateDate, 'DD/MM/YYYY').format(
            'DD/MM/YYYY',
          )
        : '',
    });
  };

  return (
    <>
      <Styled.ReportsFormContainer className="container">
        <div className="prices__header">
          <h1>Gerar Laudo</h1>
          <div>
            <Button onClick={handleToggleModal}>Voltar</Button>
          </div>
        </div>
        <Form onFinish={handleSubmit(onSubmit)} className="prices-form">
          <Card className="prices-form__fields">
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              id="dados_do_cliente"
            >
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  DADOS DO CLIENTE
                </h2>
                <br />
              </Col>

              <Col xs={24}>
                <FormItem control={control} name="client">
                  <Select
                    id="client"
                    showSearch
                    placeholder="Selecione um Transportador"
                    optionFilterProp="label"
                    label="Transportador"
                    allowClear
                    autoClearSearchValue
                    onChange={handleChangeClient}
                    options={clientsListOptions}
                    autoFocus
                  />
                </FormItem>
              </Col>

              <Col xs={24}>
                <FormItem control={control} name="driver">
                  <Select
                    id="driver"
                    showSearch
                    placeholder="Selecione um Condutor"
                    optionFilterProp="label"
                    label="Condutor"
                    allowClear
                    autoClearSearchValue
                    onChange={handleChangeDriver}
                    options={driverListOptions}
                  />
                </FormItem>
              </Col>

              <Col xs={24}>
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
                <FormItem control={control} name="truck">
                  <Input
                    id="truck"
                    name="truck"
                    label="Placa Cavalo/Truck"
                    placeholder="Placa Cavalo/Truck"
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
                    label="Placa Carreta/Tanque"
                    placeholder="Placa Carreta/Tanque"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="sanitarySurveillance">
                  <RadioGroup
                    id="sanitarySurveillance"
                    label="Vigilância Sanitária válida?"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="NÃO">NÃO</Radio>
                    <Radio value="SIM">Sim</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="adapterNeedsToBeCleaned">
                  <RadioGroup
                    id="adapterNeedsToBeCleaned"
                    label="Adaptador precisa ser limpo?"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="NÃO">NÃO</Radio>
                    <Radio value="SIM">Sim</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} id="checklist">
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  CHECKLIST
                </h2>
                <br />
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="clothsUsed">
                  <Input
                    id="clothsUsed"
                    name="clothsUsed"
                    label="Panos Utilizados"
                    placeholder="Panos Utilizados"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedCloths">
                  <Input
                    id="returnedCloths"
                    name="returnedCloths"
                    label="Panos Devolvidos"
                    placeholder="Panos Devolvidos"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="capsUsed">
                  <Input
                    id="capsUsed"
                    name="capsUsed"
                    label="Toucas Utilizadas"
                    placeholder="Toucas Utilizadas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedCaps">
                  <Input
                    id="returnedCaps"
                    name="returnedCaps"
                    label="Toucas Devolvidas"
                    placeholder="Toucas Devolvidas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="glovesUsed">
                  <Input
                    id="glovesUsed"
                    name="glovesUsed"
                    label="Luvas Utilizadas"
                    placeholder="Luvas Utilizadas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedGloves">
                  <Input
                    id="returnedGloves"
                    name="returnedGloves"
                    label="Luvas Devolvidas"
                    placeholder="Luvas Devolvidas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="bootsUsed">
                  <Input
                    id="bootsUsed"
                    name="bootsUsed"
                    label="Botas Utilizadas"
                    placeholder="Botas Utilizadas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedBoots">
                  <Input
                    id="returnedBoots"
                    name="returnedBoots"
                    label="Botas Devolvidas"
                    placeholder="Botas Devolvidas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="flashlightsUsed">
                  <Input
                    id="flashlightsUsed"
                    name="flashlightsUsed"
                    label="Lanternas Utilizadas"
                    placeholder="Lanternas Utilizadas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedFlashlights">
                  <Input
                    id="returnedFlashlights"
                    name="returnedFlashlights"
                    label="Lanternas Devolvidas"
                    placeholder="Lanternas Devolvidas"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="pliersUsed">
                  <Input
                    id="pliersUsed"
                    name="pliersUsed"
                    label="Alicate Utilizado"
                    placeholder="Alicate Utilizado"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedPliers">
                  <Input
                    id="returnedPliers"
                    name="returnedPliers"
                    label="Alicate Devolvido"
                    placeholder="Alicate Devolvido"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="ladderUsed">
                  <Input
                    id="ladderUsed"
                    name="ladderUsed"
                    label="Escada Utilizada"
                    placeholder="Escada Utilizada"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="returnedLadder">
                  <Input
                    id="returnedLadder"
                    name="returnedLadder"
                    label="Escada Devolvida"
                    placeholder="Escada Devolvida"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              id="etapa_de_temperatura"
            >
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  ETAPA DE TEMPERATURA
                </h2>
                <br />
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="temperatureCheck">
                  <Input
                    id="temperatureCheck"
                    name="temperatureCheck"
                    label="Temperatura"
                    placeholder="Temperatura"
                    autoComplete="off"
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="timeCheck">
                  <Input
                    id="timeCheck"
                    name="timeCheck"
                    label="Tempo"
                    placeholder="Tempo"
                    autoComplete="off"
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

              <Col xs={24} md={12}>
                <FormItem control={control} name="valveLeakTest">
                  <RadioGroup
                    id="valveLeakTest"
                    label="Teste de Vazamento da Válvula e Descarga?"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="REPROVADO">REPROVADO</Radio>
                    <Radio value="APROVADO">APROVADO</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="phTest">
                  <RadioGroup
                    id="phTest"
                    label="PH (6,8 a 7,2)"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="REPROVADO">REPROVADO</Radio>
                    <Radio value="APROVADO">APROVADO</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  LACRES
                </h2>
                <br />
              </Col>

              <Col xs={24}>
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
              <Col xs={24}>
                <FormItem control={control} name="securityValveVisitMouth">
                  <Input
                    id="securityValveVisitMouth"
                    name="securityValveVisitMouth"
                    label="Válvula de Segurança da Boca de Visita"
                    placeholder="Válvula de Segurança da Boca de Visita"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24}>
                <FormItem control={control} id="manometer" name="manometer">
                  <Input
                    id="manometer"
                    name="manometer"
                    label="Manômetro"
                    placeholder="Manômetro"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24}>
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
              <Col xs={24}>
                <FormItem control={control} name="drainValve">
                  <Input
                    id="drainValve"
                    name="drainValve"
                    label="Dreno"
                    placeholder="Dreno"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24}>
                <FormItem control={control} name="dischargeValve">
                  <Input
                    id="dischargeValve"
                    name="dischargeValve"
                    label="Válvula da Boca de Descarga"
                    placeholder="Válvula da Boca de Descarga"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  PH (6,8 a 7,2)
                </h2>
                <br />
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="mounthDischargePH">
                  <Input
                    id="mounthDischargePH"
                    name="mounthDischargePH"
                    label="PH Boca Descarga"
                    placeholder="PH Boca Descarga"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="hoseHolderPH">
                  <Input
                    id="hoseHolderPH"
                    name="hoseHolderPH"
                    label="PH Mangote"
                    placeholder="PH Mangote"
                    autoComplete="off"
                    showCount
                    maxLength={150}
                  />
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  ÚLTIMOS PRODUTOS TRANSPORTADOS
                </h2>
                <br />
              </Col>

              <Col xs={24} md={8}>
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
              <Col xs={24} md={8}>
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
              <Col xs={24} md={8}>
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
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  LIMPEZA EXTERNA
                </h2>
                <br />
              </Col>

              <Col xs={24} md={8}>
                <FormItem control={control} name="valves">
                  <RadioGroup
                    id="valves"
                    label="Válvulas"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="NÃO">NÃO</Radio>
                    <Radio value="SIM">SIM</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={8}>
                <FormItem control={control} name="hoseExternal">
                  <RadioGroup
                    id="hoseExternal"
                    label="Mangueiras"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="NÃO">NÃO</Radio>
                    <Radio value="SIM">SIM</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={8}>
                <FormItem control={control} name="pipesExternal">
                  <RadioGroup
                    id="pipesExternal"
                    label="Tubulações"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="NÃO">NÃO</Radio>
                    <Radio value="SIM">SIM</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24}>
                <h2
                  className="prices-form__fields__title"
                  style={{ textAlign: 'center' }}
                >
                  AVALIAÇÃO - APÓS HIGIENIZAÇÃO
                </h2>
                <br />
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="strangeBody">
                  <RadioGroup
                    id="strangeBody"
                    label="Corpo Estranho"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="AUSENTE">AUSENTE</Radio>
                    <Radio value="PRESENTE">PRESENTE</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="suitability">
                  <RadioGroup
                    id="suitability"
                    label="Sujidade"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="AUSENTE">AUSENTE</Radio>
                    <Radio value="PRESENTE">PRESENTE</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="presenceOfLiquids">
                  <RadioGroup
                    id="presenceOfLiquids"
                    label="Presença de Água / Líquidos"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="AUSENTE">AUSENTE</Radio>
                    <Radio value="PRESENTE">PRESENTE</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="odors">
                  <RadioGroup
                    id="odors"
                    label="Odor"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="AUSENTE">AUSENTE</Radio>
                    <Radio value="PRESENTE">PRESENTE</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="hoseSuitability">
                  <RadioGroup
                    id="hoseSuitability"
                    label="Mangote com Sujidade"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="AUSENTE">AUSENTE</Radio>
                    <Radio value="PRESENTE">PRESENTE</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col xs={24} md={12}>
                <FormItem control={control} name="damagedHose">
                  <RadioGroup
                    id="damagedHose"
                    label="Mangote Danificado"
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio value="AUSENTE">AUSENTE</Radio>
                    <Radio value="PRESENTE">PRESENTE</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                          Array.isArray(dateString)
                            ? dateString[0]
                            : dateString,
                        );
                      }}
                    />
                  </div>
                </FormItem>
              </Col>

              <Col xs={24} md={12}>
                <FormItem control={control} name="review">
                  <Input
                    id="review"
                    name="review"
                    label="Revisão"
                    placeholder="Revisão"
                    autoComplete="off"
                    maxLength={150}
                  />
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

              <Col xs={24}>
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
            </Row>

            <div className="prices-form__footer">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                disabled={isSubmitting || isLoading}
              >
                Salvar
              </Button>
            </div>
          </Card>
        </Form>
      </Styled.ReportsFormContainer>
      <Modal
        title="Desejar cancelar a operação?"
        open={isOpenModal}
        centered
        okText="Confirmar"
        cancelText="Cancelar"
        onClose={handleToggleModal}
        onCancel={handleToggleModal}
        onOk={() => navigate('/reports')}
        okButtonProps={{ danger: true }}
      >
        <p>Após o cancelamento os dados serão descartados!</p>
      </Modal>
    </>
  );
};
