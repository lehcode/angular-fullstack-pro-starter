import { Injectable } from '@nestjs/common';
import { NHTSAService } from './services/nhtsa/nhtsa.service';
import { Subscription } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly nhtsaService: NHTSAService) {}

  get nhtsaVehicleVariables(): Subscription {
    return this.nhtsaService.vehicleVariables.subscribe({
      next(data) {
        console.log(JSON.stringify(data));
      },
      error(msg) {
        throw new Error(msg);
      }
    });
  }
}
