import { HttpService, Injectable } from '@nestjs/common';
import { defer, from, interval, Observable, of, Subscription, timer, zip } from 'rxjs';
import { AxiosResponse } from 'axios';
import { VehicleVariableInterface, VehicleVariableValueInterface } from '../../interfaces/vehicle-variables.interface';
import { delay, map, mergeAll, mergeMap, tap, throttle, throttleTime } from 'rxjs/operators';

@Injectable()
export class NHTSAService {
  private readonly API_HOST = 'https://vpic.nhtsa.dot.gov';
  private readonly VEHICLE_VARS_URI = '/api/vehicles/GetVehicleVariableList?format=json';
  private readonly VEHICLE_VARS_VALUES_URI = '/api/vehicles/GetVehicleVariableValuesList/:id?format=json';

  constructor(private readonly http: HttpService) {}

  get apiVehicleVariables(): Observable<any> {
    let results: any;

    return this.http.get(`${this.API_HOST}${this.VEHICLE_VARS_URI}`)
    .pipe(
      // map((resp) => resp.data.Results),
      tap((response) => results = response.data.Results),
      mergeMap((response) => zip(
        ...results.map(
          (result: Record<string, any>): Record<string, any> => {
            return this._getVariableValues(result);
          }
        )
      ), 5)
    );
  }

  private _getVariableValues(result: Record<string, any>) {
    const variable: VehicleVariableInterface = {
      dataType: result.DataType,
      description: result.Description,
      id: result.ID,
      name: result.Name
    };

    if (variable.dataType === 'lookup') {
      this.getRemoteVariableIdValues$(variable.id).subscribe({
        next(data: Record<string, any>) {
          variable.values = data.Results.map((result: Record<string, any>) => {
            return {
              id: result.Id,
              name: result.Name
            };
          });
        }
      });
    }

    return of(variable).pipe(delay(1000));
  }


  // get remoteVariables$(): Subscription {
  //   const updateLookups = this._updateLookups;
  //
  //   return this.apiService.callEndpoint(`${this.API_HOST}${this.VEHICLE_VARS_URI}`, 'get').subscribe({
  //     next(data) {
  //       console.log(data);
  //       const update = updateLookups(data);
  //       return data;
  //     },
  //     error(msg) {
  //       throw new Error(msg);
  //     }
  //   });
  // }
  //
  // private _updateLookups(lookups: any) {
  //   console.log(lookups);
  //   // @ts-ignore
  //   debugger;
  // }

  // // todo
  // compareVariables() {
  //   return true;
  // }

  // todo
  // updateVariables() {
  //   let vars: VehicleVariableInterface[];
  //
  //   return this.remoteVariables$;
  // }

  getRemoteVariableIdValues$(id: number): Observable<AxiosResponse<Record<any, any>>> {
    return this.http.get(`${this.API_HOST}${this.VEHICLE_VARS_VALUES_URI}`.replace(':id', id.toString()))
    .pipe(
      map((response) => response.data)
    );
  }
}
