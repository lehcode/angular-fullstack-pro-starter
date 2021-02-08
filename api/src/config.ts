export default () => ({
  services: {
    nhtsa: {
      apiHost: 'https://vpic.nhtsa.dot.gov',
      uris: {
        vehicleVars: '/api/vehicles/GetVehicleVariableList?format=json',
        vehicleVarsValues: '/api/vehicles/GetVehicleVariableValuesList/{:id}?format=json',
        decodeVin: '/api/vehicles/DecodeVinExtended/{:vin}?format=json',
        decodeVinValues: '/vehicles/DecodeVinValuesExtended/{:vin}?format=json&modelyear={:year}'
      }
    }
  },
  locale: {
    default: 'en'
  }
});
