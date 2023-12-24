import { ROLE } from '../../users/interfaces/role.interface';
import { PermissionType } from '../authorization/constants/permission.constants';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: ROLE;
  permissions: PermissionType[];
}
