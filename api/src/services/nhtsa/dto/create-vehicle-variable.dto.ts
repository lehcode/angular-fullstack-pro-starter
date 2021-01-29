import { VehicleVariableValueInterface } from '../interfaces/vehicle-variable.interface';

export class CreateVehicleVariableDto {
  dataType: string;
  description: string;
  varId: number;
  name: string;
  values?: VehicleVariableValueInterface[];
}
