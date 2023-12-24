import { SetMetadata } from '@nestjs/common';

import { AUTH_TYPE, AUTH_TYPE_KEY } from '../constants/auth-type.constant';

export const Auth = (...authTypes: AUTH_TYPE[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
