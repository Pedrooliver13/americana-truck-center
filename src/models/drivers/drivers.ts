export interface Drivers {
  id: string;
  name: string;
  document: string;
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
  email?: string | undefined;
}

export interface PutDriver extends PostDriver {
  id: string;
}
