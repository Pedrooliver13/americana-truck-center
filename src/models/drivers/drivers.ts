export interface Drivers {
  id: string;
  name: string;
  document: string;
  client?: string;
  clientName?: string;
  code: string;
  phone: string;
  email?: string | undefined;
}

export interface DriversToExport {
  NOME: string;
}

export interface PostDriver {
  name: string;
  document: string;
  phone: string;
  client?: string | undefined;
  clientName?: string | undefined;
  email?: string | undefined;
}

export interface PutDriver extends PostDriver {
  id: string;
}
