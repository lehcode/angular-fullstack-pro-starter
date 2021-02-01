import { Injectable } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { VehicleVariableInterface } from '../nhtsa/interfaces/vehicle-variable.interface';

@Injectable()
export class ApiService {
  constructor(private readonly nhtsaService: NHTSAService) {}

  /**
   * Get NHTSA vehicle variables from API
   */
  async getNHTSAVehicleVariables(): Promise<VehicleVariableInterface[]> {
    return this.nhtsaService.getVehicleVariables().toPromise();
  }

  async decodeVIN(code: string, mode: string): Promise<any> {
    let result;

    switch (mode) {
      default:
      case 'default':
        result = await this.nhtsaService.decodeVIN(code);
        break;
      case 'extended':
        result = await this.nhtsaService.decodeVINExtended(code);
    }

    return result.toPromise();
  }
}
