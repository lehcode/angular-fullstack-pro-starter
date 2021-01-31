import { Controller, Get, Post, Req } from '@nestjs/common';
import { ErrorResponseInterface, SuccessReponseInterface } from '../api/interfaces/response.interface';
import { ApiService } from '../api/services/api/api.service';
import { NHTSAService } from '../api/services/nhtsa/nhtsa.service';
import { Request } from 'express';
import { rethrow } from '@nestjs/core/helpers/rethrow';

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
    let rows;

    if (req) {
      try {
        rows = await this.apiService.getNHTSAVehicleVariables();

        return {
          success: true,
          message: `Inserted ${rows.length} rows`
        };
      } catch (err) {
        rethrow(err.message);
      }
    }
  }

  @Get('nhtsa-variables')
  async getNHTSAVehicleVariables(): Promise<ErrorResponseInterface | SuccessReponseInterface> {
    let rows;

    try {
      rows = await this.nhtsaService.queryVehicleVariables();
    } catch (err) {
      this.errorResponse.error = err.message;
      return this.errorResponse;
    }

    return rows.toPromise();
  }
}
