import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(private readonly apiService: ApiService) {}

  @Post('admin/nhtsa-update-variables')
  async vehicleVariables(@Req() req?: Request): Promise<unknown> {
    // 1. Fetch variables from DB
    // 2. Fetch variables from NHTSA API endpoint
    // 3. Query DB for variables and values
    // 4. Compare variables and values from API and DB (this.compareVariables())
    // 5. Update if API result differs from DB (this.updateVariables())
    // 6. Return status

    if (req) {
      this.logger.log('Request headers:');
      this.logger.log(req.headers);

      this.apiService.nhtsaVehicleVariables.subscribe({
          next(rows) {
            console.log(rows);
          },
          error(msg: string) {
            throw new Error(msg);
          }
        });

      return { success: true };
    }
  }
}
