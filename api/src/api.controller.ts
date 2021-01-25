import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { VehicleVariableInterface } from './interfaces/vehicle-variables.interface';
import { NHTSAService } from './services/nhtsa/nhtsa.service';

@Controller('api')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(private readonly nhtsaService: NHTSAService) {}

  @Post('admin/nhtsa-update-variables')
  async vehicleVariables(@Req() req?: Request): Promise<any> {
    let vars$: VehicleVariableInterface[] = [];

    // 1. Fetch variables from DB
    // 2. Fetch variables from NHTSA API endpoint
    // 3. Query DB for variables and values separately
    // 4. Compare variables and values from API and DB (this.compareVariables())
    // 5. Update if API result differs from DB (this.updateVariables())
    // 6. Return status

    if (req) {
      this.logger.log('Request headers:');
      this.logger.log(req.headers);
      vars$ = this.nhtsaService.apiVehicleVariables.subscribe({
          next(rows) {
            console.log(rows);
          },
          error(msg: string) {
            throw new Error(msg);
          }
        }
      ) as any;

      return { success: true };
    }
  }
}
