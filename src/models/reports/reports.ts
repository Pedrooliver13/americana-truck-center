// Packages
import { Timestamp } from 'firebase/firestore';

export interface Report {
  id?: string;
  reportId?: string;

  /* DADOS DO CLIENTE */
  client?: string;
  driver?: string;
  socialName: string;
  driverName: string;
  truck: string;
  tank: string;
  sanitarySurveillance?: string;
  adapterNeedsToBeCleaned?: string;

  /* CHECKLIST */
  clothsUsed: string;
  returnedCloths: string;

  capsUsed: string;
  returnedCaps: string;

  glovesUsed: string;
  returnedGloves: string;

  bootsUsed: string;
  returnedBoots: string;

  flashlightsUsed: string;
  returnedFlashlights: string;

  pliersUsed: string;
  returnedPliers: string;

  ladderUsed: string;
  returnedLadder: string;

  temperatureCheck: string;
  timeCheck: string;
  valveLeakTest: string;
  phTest: string;

  /* LACRES */
  visitMouth: string;
  securityValveVisitMouth: string;
  manometer: string;

  /* PH */
  mounthDischargePH: string;
  hoseHolderPH: string;

  /* ÚLTIMOS PRODUTOS TRANSPORTADOS */
  lastProduct: string;
  pernultimateProduct: string;
  antepernultimateProduct: string;
  hoseSuitability: string;
  damagedHose: string;

  /* LIMPEZA EXTERNA */
  valves: string;
  hoseExternal: string;
  pipesExternal: string;

  /* AVALIAÇÃO - APÓS HIGIENIZAÇÃO */
  strangeBody: string;
  odors: string;
  presenceOfLiquids: string;
  suitability: string;
  hoseHolder: string;

  /* DADOS DA HIGIENIZAÇÃO */
  hygieneCertificateDate?: string | Timestamp | Date;
  reviewDate?: string | Timestamp | Date;
  review: string;
  capacity: string;
  dischargeValve: string;
  drainValve: string;
  detergentUsed: string;
  temperatureRinse: string;
  temperatureWashing: string;

  /* CONTROLE */
  createdAt?: Timestamp;
}

export interface ReportsToExport {
  ID: string;
  'RAZÃO SOCIAL': string;
  'ID DO LAUDO': string;
}

export interface PostReport extends HygieneCertificate {}

export interface HygieneCertificate extends Report {}
