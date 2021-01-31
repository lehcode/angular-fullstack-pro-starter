import { VehicleVariableInterface, VehicleVariableValueInterface } from './vehicle-variable.interface';
import { Document } from 'mongoose';

export interface VehicleVariableDocument extends VehicleVariableInterface, Document {}
