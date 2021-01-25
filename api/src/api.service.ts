import { HttpService, Injectable } from '@nestjs/common';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { VehicleVariableInterface } from './interfaces/vehicle-variables.interface';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  public callEndpoint(url: string, method: 'get', data?: Record<string, any>[]): Observable<AxiosResponse<Record<string, any>>> {
    let results: VehicleVariableInterface[] = [];

    return this.http[method](url).pipe(map(response => results = response.data),);

    // return this.http[method](url).pipe(map(resp => {
    //   return resp.data;
    // }));
  }

  // get nhtsaVehicleVariables(): Subscription {
  //   return this.nhtsaService.remoteVariables$.subscribe({
  //     next(data) {
  //       // console.log(data);
  //       return data;
  //     },
  //     error(msg) {
  //       throw new Error(msg);
  //     }
  //   });
  // }

  // get nhtsaVehicleVariablesValues(): Subscription {
  //
  // }
}
