import { VehicleVariableInterface } from '@services/nhtsa/interfaces/vehicle-variable.interface';
import { Document } from 'mongoose';

export interface VehicleVariableDocument extends VehicleVariableInterface, Document {}