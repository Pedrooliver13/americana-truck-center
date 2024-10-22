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
