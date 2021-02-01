import { Controller, Get, Post, Req } from '@nestjs/common';
import { ErrorResponseInterface, SuccessReponseInterface } from '../api/interfaces/response.interface';
import { ApiService } from '../api/services/api/api.service';
import { NHTSAService } from '../api/services/nhtsa/nhtsa.service';
import { Request } from 'express';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { VehicleVariableInterface } from '../api/services/nhtsa/interfaces/vehicle-variable.interface';

@Controller('admin')
export class AdminController {
  private readonly errorResponse: ErrorResponseInterface
  private readonly successResponse: SuccessReponseInterface

  constructor(
    private readonly apiService: ApiService,
    private readonly nhtsaService: NHTSAService
  ) {
    this.errorResponse = {
      success: false,
      error: 'Unspecified error'
    };
  }

  @Post('nhtsa-update-variables')
  async updateNHTSAVehicleVariables(@Req() req?: Request): Promise<SuccessReponseInterface | undefined> {
    if (req) {
      try {
        const vars = await this.apiService.getNHTSAVehicleVariables();
        const inserted = await this.nhtsaService.storeVehicleVariables(vars);

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
  async getNHTSAVehicleVariables(): Promise<ErrorResponseInterface | SuccessReponseInterface> {
    let rows: VehicleVariableInterface[];

    try {
      rows = await this.nhtsaService.queryVehicleVariables();
    } catch (err) {
      rethrow(err.message);
    }

    return {
      success: true,
      message: 'success',
      data: rows
    };
  }
}
