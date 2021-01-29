import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from '../../services/api/api.service';
import { NHTSAService } from '../../services/nhtsa/nhtsa.service';
import { CreateVehicleVariableDto } from '../../services/nhtsa/dto/create-vehicle-variable.dto';

@Controller('api')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(private readonly apiService: ApiService,
              private readonly nhtsaService: NHTSAService) {}

  @Post('admin/nhtsa-update-variables')
  async updateNHTSAVehicleVariables(@Req() req?: Request): Promise<unknown> {
    // 1. Fetch variables from DB
    // 2. Fetch variables from NHTSA API endpoint
    // 3. Query DB for variables and values
    // 4. Compare variables and values from API and DB (this.compareVariables())
    // 5. Update if API result differs from DB (this.updateVariables())
    // 6. Return status

    const nhtsaService = this.nhtsaService;

    if (req) {
      this.logger.log('Request headers:');
      this.logger.log(req.headers);

      this.apiService.nhtsaVehicleVariables.subscribe({
        next(data) {
          nhtsaService.storeVehicleVariables(data);
        },
        error(msg: string) {
          throw new Error(msg);
        }
      });

      return { success: true };
    }
  }
}
