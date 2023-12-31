import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AccessTokenGuard } from './access-token.guard';
import { ApiKeyGuard } from './api-key.guard';
import { AUTH_TYPE, AUTH_TYPE_KEY } from '../../constants/auth-type.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly DEFAULT_AUTH_TYPE = AUTH_TYPE.BEARER;
  private readonly authTypeGuardMap: Record<
    AUTH_TYPE,
    CanActivate | CanActivate[]
  > = {
    [AUTH_TYPE.BEARER]: this.accessTokenGuard,
    [AUTH_TYPE.API_KEY]: this.apiKeyGuard,
    [AUTH_TYPE.NONE]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AUTH_TYPE[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.DEFAULT_AUTH_TYPE];
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    let resultedError = new UnauthorizedException();

    for (const instance of guards) {
      try {
        const isAvailable = await instance.canActivate(context);

        if (isAvailable) {
          return true;
        }
      } catch (error) {
        resultedError = error;
      }
    }

    throw resultedError;
  }
}
