import { Injectable } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private readonly nhtsaService: NHTSAService) {}

  get nhtsaVehicleVariables(): Promise<any> {
    const result = this.nhtsaService.getVehicleVariables();

    return result.pipe(
      take(1),
      map((data) => this.nhtsaService.storeVehicleVariables(data))
    ).toPromise();
  }
}
