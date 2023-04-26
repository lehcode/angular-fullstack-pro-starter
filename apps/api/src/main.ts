import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sourcemap from 'source-map-support';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import { AppConfigService } from '@services/app-config/app-config.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import * as fs from 'fs';
import * as path from 'path';
let httpsOptions:{ key: Buffer | undefined, cert: Buffer | undefined };

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, { httpsOptions });
  const appConfig: AppConfigService = app.get(AppConfigService);
  const appLogger: AppLoggerService = app.get(AppLoggerService);

  if (appConfig.ssl) {
    httpsOptions = {
      key: fs.readFileSync(path.resolve('/home/node/.ssl/server.key')),
      cert: fs.readFileSync(path.resolve('/home/node/.ssl/server.crt')),
    };
  }

  app.enableCors({
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(middleware.handle(i18next));
  app.useLogger(appLogger);

  await i18next.use(middleware.LanguageDetector)
    .init({ preload: <Array<string>>appConfig.get('i18n.locales') });

  const port = <number>appConfig.get('api.port');
  const hostname = <string>appConfig.get('hostname');
  const proto = 'http' + (appConfig.ssl ? 's' : '');

  await app.listen(port, hostname, () => {
    appLogger.log(`Listening at ${proto}://${hostname}:${port}/`);
  });
}

sourcemap.install();
bootstrap();
