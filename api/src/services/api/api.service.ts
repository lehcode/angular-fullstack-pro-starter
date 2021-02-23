import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ObjectSchema } from 'joi';

import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { VehicleVariableInterface } from '@services/nhtsa/interfaces/vehicle-variable.interface';
import { DecodedVinItemInterface } from '@services/api/interfaces/decoded-vin-item.interface';
import { VINDecodeParams } from '@services/api/validation/vin-decode-params';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private yearSchema: ObjectSchema;

  constructor(
    private readonly nhtsaService: NHTSAService,
  ) {}

  /**
   * Get NHTSA vehicle variables from API
   */
  async getNHTSAVehicleVariables(): Promise<VehicleVariableInterface[]> {
    return this.nhtsaService.getVehicleVariables()
      .toPromise();
  }

  /**
   * GET decoded dataset
   */
  getNHTSADecodedVIN$(params: VINDecodeParams): Observable<DecodedVinItemInterface[]> {
    return this.nhtsaService.decodeVIN$(params.code, params.year);
  }
}
