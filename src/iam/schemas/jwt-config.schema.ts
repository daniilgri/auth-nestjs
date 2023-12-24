import * as Joi from 'joi';

export const jwtConfigValidationSchema = Joi.object({
  secret: Joi.required(),
  audience: Joi.required(),
  issuer: Joi.required(),
  accessTokenTtl: Joi.number().default(3600),
  refreashTokenTtl: Joi.required().default(86400),
});
