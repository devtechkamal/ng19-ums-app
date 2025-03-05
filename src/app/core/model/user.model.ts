import { Role } from './common.model';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}
