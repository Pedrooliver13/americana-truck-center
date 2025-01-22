export enum ERoles {
  ADMIN = 1,
  USER = 2,
}

export interface CreateUser {
  email: string;
  password: string;
}
