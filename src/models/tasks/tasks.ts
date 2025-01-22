// Packages
import { Timestamp } from 'firebase/firestore';

// Models
import { Clients } from 'models/clients/clients';

export interface Task {
  id: string;
  name: string;
  document: string;
  vehicle: string;
  licensePlate: string;
  fleet: string;
  createdAt: Timestamp;
  total: number;
  status: number;
  phone: string;
  client?: string;
  currentClient: Clients | null;
  driver?: string;
  driverDocument: string;
  observation?: string;
  services: Array<{
    id: string;
    name: string;
    value?: number;
    minValue: string;
    maxValue: string;
    client?: string;
  }>;
}

export interface TasksToExport {
  NOME: string;
  'DOCUMENTO DO MOTORISTA': string;
  'DOCUMENTO DO CLIENTE': string;
  PLACA: string;
  FROTA: string;
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
  currentClient: Clients | void;
  driverDocument: string;
  driver: string;
  licensePlate: string;
  fleet: string;
  observation?: string;
  createdAt: string;
  services: Array<{
    id: string;
    name: string;
    minValue: string;
    maxValue: string;
  } | void>;
}
