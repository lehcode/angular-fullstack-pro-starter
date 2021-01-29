import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from '../../services/api/api.service';
import { NHTSAService } from '../../services/nhtsa/nhtsa.service';

@Controller('api')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(
    private readonly apiService: ApiService,
    private readonly nhtsaService: NHTSAService,
  ) {}

  @Post('admin/nhtsa-update-variables')
  async updateNHTSAVehicleVariables(@Req() req?: Request): Promise<unknown> {
    if (req) {
      this.apiService.nhtsaVehicleVariables.subscribe((data) => {
        this.nhtsaService.storeVehicleVariables(data);
      });

      return { success: true };
    }
  }
}
