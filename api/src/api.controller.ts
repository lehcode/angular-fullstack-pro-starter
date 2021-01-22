import { Controller, Logger, Patch, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request } from 'express';
import { VehicleVariableInterface } from './interfaces/vehicle-variables.interface';

@Controller('api')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(private readonly apiService: ApiService) {}

  @Patch('admin/nhtsa-variables-values')
  async vehicleVariables(@Req() req?: Request): Promise<any> {
    let vVars: VehicleVariableInterface[] = [];

    if (req) {
      this.logger.log('Request headers:');
      this.logger.log(req.headers);
      vVars = await this.apiService.nhtsaVehicleVariables as any;

      return vVars;
    }
  }
}
