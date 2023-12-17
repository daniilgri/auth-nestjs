import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_NAME: Joi.required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_HOST: Joi.required(),
});
