import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class NHTSAService {
  private readonly API_HOST = 'https://vpic.nhtsa.dot.gov';
  private readonly VEHICLE_VARS_URI = '/api/vehicles/GetVehicleVariableList?format=json';

  constructor(private http: HttpService) {}

  // WIP
  get vehicleVariables(): Observable<AxiosResponse<any>> {
    // 1. Fetch variables from DB
    // 2. Fetch variables from NHTSA API endpoint
    const url = `${this.API_HOST}${this.VEHICLE_VARS_URI}`;

    const apiVars = this.http.get(url)
    .pipe(map((resp) => resp.data));

    // 3. Query DB for variables
    // 4. Compare results from API and DB (this.compareVariables())
    // 5. Update DB if API result differs (this.updateVariables())
    // 6. Return result collection
    return apiVars;
  }

  compareVariables(){
    return true;
  }

  updateVariables() {
    return true;
  }
}
