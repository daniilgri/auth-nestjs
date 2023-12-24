import { SetMetadata } from '@nestjs/common';

import { ROLE } from '../../users/interfaces/role.interface';
import { ROLES_KEY } from '../constants/roles.constants';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
