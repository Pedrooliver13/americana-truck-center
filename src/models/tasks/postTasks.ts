export interface PostTask {
  name: string;
  phone: string;
  document: string;
  vehicle: string | null;
  client: string;
  licensePlate: string;
  createdAt: string;
  services: Array<{
    id: number;
    name: string;
    minValue: string;
    maxValue: string;
  } | void>;
}
