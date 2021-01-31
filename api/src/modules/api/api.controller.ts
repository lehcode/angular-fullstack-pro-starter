import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from '../../services/api/api.service';
import { NHTSAService } from '../../services/nhtsa/nhtsa.service';
import { ErrorResponseInterface, SuccessReponseInterface } from './interfaces/response.interface';

@Controller('api')
export class ApiController {
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

  @Post('admin/nhtsa-update-variables')
  async updateNHTSAVehicleVariables(@Req() req?: Request): Promise<ErrorResponseInterface | SuccessReponseInterface> {
    let rows;

    if (req) {
      try {
        rows = await this.apiService.nhtsaVehicleVariables;
      } catch (err) {
        this.errorResponse.error = err.message;
        return this.errorResponse;
      }

      return {
        success: true,
        message: `Inserted ${rows.length} rows`
      };
    }

    return this.errorResponse;
  }

  @Get('admin/nhtsa-variables')
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
