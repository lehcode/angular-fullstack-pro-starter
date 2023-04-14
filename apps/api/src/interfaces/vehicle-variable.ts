export interface VehicleVariableInterface {
  dataType: string;
  description: string;
  varId: number;
  name: string;
  values?: VehicleVariableValueInterface[];
}

export interface VehicleVariableValueInterface {
  id: number | null;
  name: string;
}
