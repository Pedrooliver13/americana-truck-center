// Packages
import { Timestamp } from 'firebase/firestore';

export interface Task {
  id: string;
  name: string;
  document: string;
  vehicle: string;
  licensePlate: string;
  createdAt: Timestamp;
  total: number;
  status: number;
  phone: string;
  services: Array<{
    id: string;
    name: string;
    value?: number;
    minValue: string;
    maxValue: string;
  }>;
}

export interface TasksToExport {
  NOME: string;
  DOCUMENTO: string;
  PLACA: string;
  'TOTAL(R$)': number;
  SERVIÇOS: string;
  DATA: string;
}

export interface PostTask {
  name: string;
  phone: string;
  document: string;
  vehicle: string | null;
  client: string;
  licensePlate: string;
  createdAt: string;
  services: Array<{
    id: string;
    name: string;
    minValue: string;
    maxValue: string;
  } | void>;
}
