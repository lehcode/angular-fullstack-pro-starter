import * as Mongoose from 'mongoose';

export const VehicleVariableSchema = new Mongoose.Schema({
  dataType: String,
  description: String,
  varId: Number,
  name: String,
  values: [{
    id: Number,
    name: String
  }]
});

export const VehicleVariable = Mongoose.model('VehicleVariable', VehicleVariableSchema);
