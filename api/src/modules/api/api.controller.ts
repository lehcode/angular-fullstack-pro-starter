// eslint-disable-next-line
import { Observable } from 'rxjs';
import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';
import * as Joi from 'joi';
import moment from 'moment';

import { ApiService } from '@api/../../services/api/api.service';
import { DecodedVinItemInterface } from '@api/../../services/api/interfaces/decoded-vin-item.interface';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('vin-decode/:code/')
  // @ts-ignore
  async decodeDefault$(@Req() req: Request): Promise<Observable<DecodedVinItemInterface[]>> {
    const merged = { ...req.params, ...req.query };
    const { error, value } = Joi.object({
      code: Joi.string()
        .required(),
      lc: Joi.string()
        .pattern(/(uk|ru|en)/),
      year: Joi.number()
        .min(1980)
        .max(moment()
          .year())
    })
      .validate(merged);

    if (error) {
      throw new BadRequestException('Validation failed');
    }

    return this.apiService.getNHTSADecodedVIN$(value)
      .pipe(map((data: DecodedVinItemInterface[]) => data));
  }
}
