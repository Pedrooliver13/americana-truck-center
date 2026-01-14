// Packages
import { Timestamp } from 'firebase/firestore';

export interface Report {
  id?: string;
  reportId?: string;
  hygieneCertificateDate?: string | Timestamp | Date;
  reviewDate?: string | Timestamp | Date;
  socialName: string;
  truck: string;
  tank: string;
  capacity: string;
  driverName: string;
  lastProduct: string;
  pernultimateProduct: string;
  antepernultimateProduct: string;
  visitMouth: string;
  respiring: string;
  dischargeValve: string;
  pressureWatch: string;
  hoseHolder: string;
  drainValve: string;
  strangeBody: string;
  suitability: string;
  presenceOfLiquids: string;
  odors: string;
  washingExecution: string;
  inspectorChoice: string;
  detergentUsed: string;
  temperatureRinse: string;
  temperatureWashing: string;
  createdAt?: Timestamp;
}

export interface ReportsToExport {
  ID: string;
  'RAZÃO SOCIAL': string;
  'ID DO LAUDO': string;
}

export interface PostReport extends HygieneCertificate {}

export interface HygieneCertificate extends Report {}
