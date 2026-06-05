import 'dotenv/config';
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production', 'staging'])
      .default('development'),
    PORT: z.coerce.number().int().positive().default(3000),

    DATABASE_URL: z.string().url(),

    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default('7d'),

    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CALLBACK_URL: z.string().url(),

    CORS_ORIGINS: z
      .string()
      .optional()
      .transform((s) =>
        s ? s.split(',').map((o) => o.trim()).filter(Boolean) : [],
      ),

    SWAGGER_ENABLED: z
      .enum(['true', 'false'])
      .default('false')
      .transform((v) => v === 'true'),

    COOKIE_DOMAIN: z.string().default(''),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

export type Env = typeof env;
