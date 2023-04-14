import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LocaleService } from '@services/locale/locale.service';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  constructor(
    private readonly locale: LocaleService,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const locale = this.locale.detect(req as Request);
    this.locale.locale = locale;

    Object.assign(req, { appLocale: locale });

    next();
  }
}
