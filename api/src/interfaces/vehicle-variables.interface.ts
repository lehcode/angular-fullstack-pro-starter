export interface VehicleVariableInterface {
  dataType: string,
  description: string,
  id: number,
  name: string,
  values?: VehicleVariableValueInterface[]
}

export interface VehicleVariableValueInterface {
  id: number | null,
  name: string
}
