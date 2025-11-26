// Packages
import { Timestamp } from 'firebase/firestore';

// Models
import { Clients } from 'models/clients/clients';

export enum ETaskStatus {
  PAID_OFF = 1,
  INVOICE = 2,
  RECEIVABLE = 3,
}

export enum ETaskServiceStatus {
  PENDING = 1,
  COMPLETED = 2,
  CANCELED = 3,
}

export const statusName = {
  [ETaskStatus.PAID_OFF]: 'Pago',
  [ETaskStatus.INVOICE]: 'Faturar',
  [ETaskStatus.RECEIVABLE]: 'A Receber',
};

export const serviceStatusName = {
  [ETaskServiceStatus.PENDING]: 'Pendente',
  [ETaskServiceStatus.COMPLETED]: 'Concluído',
  [ETaskServiceStatus.CANCELED]: 'Cancelado',
};

export interface Task {
  id: string;
  name: string;
  document: string;
  code: string;
  vehicle: string;
  licensePlate: string;
  fleet: string;
  createdAt: Timestamp;
  total: number;
  status: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE;
  statusName?: string;
  serviceStatus: ETaskServiceStatus.PENDING | ETaskServiceStatus.COMPLETED;
  serviceStatusName?: string;
  phone: string;
  client?: string;
  currentClient?: Clients | null | void;
  clientName: string;
  driver?: string;
  driverDocument: string;
  observation?: string;
  createdBy?: string;
  updatedBy?: string;
  services: Array<{
    id: string;
    name: string;
    type: string;
    value: number | string;
    client?: string;
  }>;
}

export interface TasksToExport {
  CLIENTE: string;
  NOME: string;
  'DOCUMENTO DO MOTORISTA': string;
  'DOCUMENTO DO CLIENTE': string;
  PLACA: string;
  FROTA: string;
  'TOTAL(R$)': number;
  SERVIÇOS: string;
  DATA: string;
  STATUS: string;
}

export interface PostTask {
  name: string;
  phone: string;
  document: string;
  code: string;
  vehicle: string | null;
  client?: string;
  clientName: string;
  currentClient?: Clients | void | null;
  driverDocument: string;
  driver?: string;
  licensePlate: string;
  fleet: string;
  observation?: string;
  createdAt: Timestamp;
  status?: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE;
  serviceStatus?: ETaskServiceStatus.PENDING | ETaskServiceStatus.COMPLETED;
  services: Array<{
    id: string;
    name: string;
    type: string;
    value: string | number;
    client?: string;
  } | void>;
  createdBy?: string;
}

export interface PutTask extends PostTask {
  id: string;
  updatedBy?: string;
}
