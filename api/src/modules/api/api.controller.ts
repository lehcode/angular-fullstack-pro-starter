import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from './services/api/api.service';
import { ErrorResponseInterface, SuccessReponseInterface } from './interfaces/response.interface';

@Controller('api')
export class ApiController {
  private readonly errorResponse: ErrorResponseInterface
  private readonly successResponse: SuccessReponseInterface

  constructor(
    private readonly apiService: ApiService,
  ) {
    this.errorResponse = {
      success: false,
      error: 'Unspecified error'
    };
  }

  @Get('decode-vin')
  async getNHTSAVehicleVariables(@Req() req: Request): Promise<ErrorResponseInterface | SuccessReponseInterface> {
    let vinData;

    try {
      vinData = await this.apiService.decodeVIN(req.params.code);

      return {
        success: true,
        message: 'success',
        data: vinData.toPromise(),
      };
    } catch (err) {
      this.errorResponse.error = err.message;
      return this.errorResponse;
    }
  }
}
