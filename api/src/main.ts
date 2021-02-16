import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sourcemap from 'source-map-support';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.API_PORT as string);
}

sourcemap.install();
bootstrap();
