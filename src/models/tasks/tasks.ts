export interface Task {
  id: number | string;
  registrationNumber: string;
  vehicle: string;
  name: string;
  total: number;
  date: string;
  services: Array<{ name: string; total: number }>;
}
