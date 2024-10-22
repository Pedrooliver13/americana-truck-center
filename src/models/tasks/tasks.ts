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
