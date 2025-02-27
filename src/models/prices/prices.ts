// Packages
import { Timestamp } from 'firebase/firestore';

export interface Prices {
  id: string;
  name: string;
  type: string;
  value: string;
  client?: string | null;
  createdAt: Timestamp | string;
}

export interface PricesToExport {
  NOME: string;
  TIPO: string;
  VALOR: string;
}

export interface PostPrice {
  name: string;
  type: string;
  value: string | number;
  client?: string | null;
}

export interface PutPrice extends PostPrice {
  id: string;
}
