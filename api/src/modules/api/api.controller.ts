import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from './services/api/api.service';
import { Observable } from 'rxjs';
import { DecodedVinItemInterface } from './services/api/interfaces/decoded-vin-item.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { LocaleService } from './services/locale/locale.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly config: ConfigService,
    private readonly localeService: LocaleService
  ) {}

  @Get('vin-decode')
  decodeDefault$(@Req() req: Request): Observable<DecodedVinItemInterface[]> {
    const locale = this.detectLocale(req);

    return this.apiService
      .getNHTSADecodedVIN$(req.query.code as string, locale as string, req.query.year as string)
      .pipe(map((data) => data));
  }

  /**
   * Detect app locale
   */
  private detectLocale(req: Request) {
    return this.localeService.detect(req);
  }
}
