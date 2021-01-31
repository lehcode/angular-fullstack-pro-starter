import { Injectable } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
// import { VehicleVariableInterface } from '../nhtsa/interfaces/vehicle-variable.interface';

@Injectable()
export class ApiService {
  constructor(private readonly nhtsaService: NHTSAService) {}

  getNHTSAVehicleVariables(): Promise<any> {
    const result = this.nhtsaService.getVehicleVariables();

    return result.pipe(
      take(1),
      map((data) => this.nhtsaService.storeVehicleVariables(data))
    ).toPromise();
  }

  async decodeVIN(code: string): Promise<any> {
    return await this.responseToPromise(this.nhtsaService.decodeVIN(code));
  }

  private async responseToPromise(observable: Observable<any>): Promise<any> {
    return observable.pipe(
      take(1),
      map((data) => this.nhtsaService.storeVehicleVariables(data))
    ).toPromise();
  }
}
