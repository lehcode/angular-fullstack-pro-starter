import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from './services/api/api.service';
import { Observable } from 'rxjs';
import { DecodedVinItemInterface } from './services/api/interfaces/decoded-vin-item.interface';
import { map } from 'rxjs/operators';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('vin-decode')
  decodeDefault$(@Req() req: Request): Observable<DecodedVinItemInterface[]> {
    return this.apiService
      .getNHTSADecodedVIN$(req.query.code as string, req.query.year as string)
      .pipe(map((data) => data));
  }
}
