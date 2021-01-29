import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sourcemap from 'source-map-support';

sourcemap.install();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  await app.listen(process.env.API_PORT as string);
}
bootstrap();
