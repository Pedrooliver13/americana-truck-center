// Packages
import { Timestamp } from 'firebase/firestore';

export interface Clients {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string;
  createdAt: Timestamp;
}

export interface ClientsToExport {
  NOME: string;
  DOCUMENTO: string;
  CELULAR: string;
  EMAIL: string;
}

export interface PostClient {
  name: string;
  email: string;
  document: string;
  phone: string;
}

export interface PutClient extends PostClient {
  id: string;
}
