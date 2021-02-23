import * as vehicleVariables from '@services/nhtsa/__stubs__/vehicle-variables.json';

export default class ApiServiceMock {
  async getNHTSAVehicleVariables(): Promise<any> {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        return vehicleVariables
          ? resolve(vehicleVariables)
          : reject('Test error');
      });
    });
  }
}
