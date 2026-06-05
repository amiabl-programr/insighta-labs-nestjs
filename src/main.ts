import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { env } from './config/env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /* eslint-disable @typescript-eslint/no-unsafe-call */
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  /* eslint-enable @typescript-eslint/no-unsafe-call */

  app.enableCors({
    origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (env.SWAGGER_ENABLED) {
    const config = new DocumentBuilder()
      .setTitle('Insighta Labs API')
      .setDescription('Insighta Labs NestJS API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(env.PORT);
}

void bootstrap();
