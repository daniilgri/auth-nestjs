import { ROLE } from '../../users/interfaces/role.interface';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: ROLE;
}
