// Packages
import { Timestamp } from 'firebase/firestore';

export interface Prices {
  id: string;
  name: string;
  value?: number;
  minValue: string;
  maxValue: string;
  client?: string | null;
  createdAt: Timestamp | string;
}

export interface PricesToExport {
  NOME: string;
  'VALOR VISUAL': string;
  'VALOR COMPLETO': string;
}

export interface PostPrice {
  name: string;
  minValue: string | number;
  maxValue: string | number;
  client?: string | null;
}

export interface PutPrice extends PostPrice {
  id: string;
}
