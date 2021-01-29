import { HttpService, Injectable } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly nhtsaService: NHTSAService) {}

  get nhtsaVehicleVariables(): Observable<any> {
    return this.nhtsaService.getVehicleVariables();
  }
}
