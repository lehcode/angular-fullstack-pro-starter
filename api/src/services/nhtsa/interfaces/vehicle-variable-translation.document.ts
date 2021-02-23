import { VehicleVariableTranslationInterface } from '@services/nhtsa/interfaces/vehicle-variable-translation.interface';
import { Document } from 'mongoose';

export interface VehicleVariableTranslationDocument extends VehicleVariableTranslationInterface, Document{};
