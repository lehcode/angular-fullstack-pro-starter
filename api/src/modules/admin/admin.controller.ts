import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiService } from '../api/services/api/api.service';
import { NHTSAService } from '../api/services/nhtsa/nhtsa.service';
import { Request } from 'express';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { Observable } from 'rxjs';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly apiService: ApiService,
    private readonly nhtsaService: NHTSAService
  ) {}

  @Post('nhtsa-variables')
  async updateNHTSAVehicleVariables(@Req() req?: Request): Promise<any> {
    if (req) {
      try {
        const vars = await this.apiService.getNHTSAVehicleVariables();
        const inserted = await this.nhtsaService.storeVehicleVariables(vars);
        // const localized = await this

        return {
          success: true,
          message: `Inserted ${inserted.length} rows`
        };
      } catch (err) {
        rethrow(err.message);
      }
    }
  }

  @Get('nhtsa-variables')
  getNHTSAVehicleVariables(): Observable<any> {
    try {
      return this.nhtsaService.queryVehicleVariables();
    } catch (err) {
      rethrow(err.message);
    }
  }
}
