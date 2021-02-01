import { VehicleVariableInterface } from '../interfaces/vehicle-variable.interface';
import { from, Observable, of } from 'rxjs';
import * as vehicleVariablesResponse from '../__stubs__/vehicle-variables-response.json';
import { delay, map } from 'rxjs/operators';
import * as lookupVariableValues from '../__stubs__/lookup-variable-values.json';

export default class NHTSAServiceMock {
  public readonly vehicleVariablesResponse: any = vehicleVariablesResponse;

  getVehicleVariables(): Observable<VehicleVariableInterface[]> {
    return from(Promise.resolve(this.vehicleVariablesResponse)).pipe(
      map((response: Record<string, any>) => response.Results)
    );
  }

  formatVariable(result: Record<string, any>): Observable<VehicleVariableInterface> {
    const variable: VehicleVariableInterface = {
      dataType: result.DataType,
      description: result.Description,
      varId: result.ID,
      name: result.Name
    };

    if (variable.dataType === 'lookup') {
      return this.getLookupValues(variable);
    }

    return of(variable);
  }

  getLookupValues(variable: VehicleVariableInterface): Observable<VehicleVariableInterface> {
    const record = Object.assign({}, variable);

    from(Promise.resolve(lookupVariableValues))
      .pipe(map((response: any) => response.Results))
      .subscribe({
        next(results: Record<string, any>) {
          record.values = results.map((result: Record<string, any>) => ({
            id: result.Id,
            name: result.Name
          }));
        }
      });

    return of(record).pipe(delay(5000));
  }

  // async queryVehicleVariablesResolve() {
  //   return new Promise((resolve) => {
  //     process.nextTick(() => resolve(vehicleVariables));
  //   });
  // }
  //
  // async queryVehicleVariablesReject() {
  //   return new Promise((resolve, reject) => {
  //     process.nextTick(() => reject('Test error'));
  //   });
  // }
}
