// Packages
import { Timestamp } from 'firebase/firestore';

// Models
import { Clients } from 'models/clients/clients';

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
  status: number;
  phone: string;
  client?: string;
  currentClient: Clients | null;
  clientName: string;
  driver?: string;
  driverDocument: string;
  observation?: string;
  services: Array<{
    id: string;
    name: string;
    type: string;
    value: number;
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
}

export interface PostTask {
  name: string;
  phone: string;
  document: string;
  code: string;
  vehicle: string | null;
  client: string;
  clientName: string;
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
    type: string;
    value: string;
  } | void>;
}
