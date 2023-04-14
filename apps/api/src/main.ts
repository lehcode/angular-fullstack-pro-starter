import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sourcemap from 'source-map-support';
import { ValidationPipe } from '@nestjs/common';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import { AppConfigService } from '@services/app-config/app-config.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get('AppConfigService');
  const appLogger: AppLoggerService = app.get(AppLoggerService);

  app.enableCors({
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(middleware.handle(i18next));
  app.useLogger(appLogger);

  await i18next.use(middleware.LanguageDetector)
    .init({ preload: appConfig.locales });
  await app.listen(appConfig.port);
}

sourcemap.install();
bootstrap();
