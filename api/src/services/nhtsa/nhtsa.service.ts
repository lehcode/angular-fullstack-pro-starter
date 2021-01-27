import { HttpService, Injectable } from '@nestjs/common';
import { Observable, of, zip } from 'rxjs';
import { VehicleVariableInterface } from '../../interfaces/vehicle-variables.interface';
import { delay, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class NHTSAService {
  private readonly API_HOST = 'https://vpic.nhtsa.dot.gov';
  private readonly VEHICLE_VARS_URI = '/api/vehicles/GetVehicleVariableList?format=json';
  private readonly VEHICLE_VARS_VALUES_URI = '/api/vehicles/GetVehicleVariableValuesList/:id?format=json';

  constructor(private readonly http: HttpService) {}

  public getVehicleVariables(): Observable<any> {
    let results: any;

    return this.http.get(`${this.API_HOST}${this.VEHICLE_VARS_URI}`)
    .pipe(
      tap((response) => results = response.data.Results),
      mergeMap((response) => zip(
        ...results.map(
          (result: Record<string, any>): Observable<VehicleVariableInterface> => {
            const variable: VehicleVariableInterface = {
              dataType: result.DataType,
              description: result.Description,
              id: result.ID,
              name: result.Name
            };

            if (variable.dataType === 'lookup') {
              return this.getLookupValues(variable);
            }

            return of(variable);
          }
        )
      ), 5)
    );
  }

  public getLookupValues(variable: VehicleVariableInterface): Observable<VehicleVariableInterface> {
    const record = Object.assign({}, variable);

    this.http
    .get(`${this.API_HOST}${this.VEHICLE_VARS_VALUES_URI}`.replace(':id', variable.id.toString()))
    .pipe(
      map((response) => response.data)
    )
    .subscribe({
      next(data: Record<string, any>) {
        record.values = data.Results.map((result: Record<string, any>) => {
          return {
            id: result.Id,
            name: result.Name
          };
        });
      }
    });

    return of(record).pipe(delay(5000));
  }
}
