export interface Users {
  id: string;
  email: string;
  roles: Array<number>;
}

export interface PutUser {
  id: string;
  email: string;
  roles: Array<number>;
}
