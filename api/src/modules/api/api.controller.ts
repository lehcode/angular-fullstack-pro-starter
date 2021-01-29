import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from '../../services/api/api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('admin/nhtsa-update-variables')
  async updateNHTSAVehicleVariables(@Req() req?: Request): Promise<any> {
    let rows;

    if (req) {
      try {
        rows = await this.apiService.nhtsaVehicleVariables;
      } catch (err) {
        return {
          success: false,
          error: err.message
        };
      }

      return {
        success: true,
        inserted: rows.length
      };
    }
  }
}
