import { SetMetadata } from '@nestjs/common';

import {
  PERMISSION_KEY,
  PermissionType,
} from '../constants/permission.constants';

export const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
