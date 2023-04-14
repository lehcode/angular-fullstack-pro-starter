import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { DecodedVinItem } from '@interfaces/decoded-vin.item';
import { VINDecodeParams } from '@services/api/validation/vin-decode-params';

@Injectable()
export class ApiService {
  constructor(
    private readonly nhtsaService: NHTSAService,
  ) {}

  /**
   * GET decoded dataset
   */
  getNHTSADecodedVIN$(params: VINDecodeParams): Observable<DecodedVinItem[]> {
    return this.nhtsaService.decodeVIN$(params.code, params.year);
  }
}
