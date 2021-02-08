import { Injectable } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { VehicleVariableInterface } from '../nhtsa/interfaces/vehicle-variable.interface';
import { Observable } from 'rxjs';
import { DecodedVinItemInterface } from './interfaces/decoded-vin-item.interface';

@Injectable()
export class ApiService {
  constructor(private readonly nhtsaService: NHTSAService) {}

  /**
   * Get NHTSA vehicle variables from API
   */
  async getNHTSAVehicleVariables(): Promise<VehicleVariableInterface[]> {
    return this.nhtsaService.getVehicleVariables().toPromise();
  }

  /**
   * GET decoded dataset
   */
  getNHTSADecodedVIN$(code: string, locale: string, year: string): Observable<DecodedVinItemInterface[]> {
    return this.nhtsaService.decodeVIN$(code, locale, parseInt(year));
  }
}
