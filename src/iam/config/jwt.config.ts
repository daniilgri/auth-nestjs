import { registerAs } from '@nestjs/config';

import { jwtConfigValidationSchema } from '../schemas/jwt-config.schema';

export const jwtConfig = registerAs('jwt', () => {
  const values = {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
    refreashTokenTtl: parseInt(
      process.env.JWT_REFRESH_TOKEN_TTL ?? '86400',
      10,
    ),
  };

  const { error } = jwtConfigValidationSchema.validate(values, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return values;
});
