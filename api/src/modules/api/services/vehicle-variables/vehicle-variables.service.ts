import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
// eslint-disable-next-line
import { VehicleVariableDocument } from '@api/services/nhtsa/interfaces/vehicle-variable.document';
import { VehicleVariable } from '@api/services/nhtsa/schemas/vehicle-variable.schema';
import { VehicleVariableInterface } from '@api/services/nhtsa/interfaces/vehicle-variable.interface';

@Injectable()
export class VehicleVariablesService {
  private readonly logger = new Logger(VehicleVariablesService.name);

  constructor(
    @InjectModel(VehicleVariable.name) private vehicleVariables: Model<VehicleVariableDocument>
  ) {}

  /**
   * Save NHTSA vehicle variables to DB
   */
  async store(data: VehicleVariableInterface[]): Promise<VehicleVariableInterface[]> {
    this.logger.log(`Inserting data (truncated): ${JSON.stringify(data)
      .substr(0, 2048)}`);

    await this.vehicleVariables.deleteMany({});
    await this.vehicleVariables.insertMany(data);

    return data;
  }

  /**
   * Query MongoDB for vehicle variables
   */
  fetchAll$(): Observable<VehicleVariableInterface[]> {
    return from(this.vehicleVariables.find()
      .exec());
  }

  /**
   * Find vehicle variable model
   */
  fetch$(varId: number, varName: string): Observable<any> {
    return from(
      this.vehicleVariables
        .findOne({ varId: varId, name: { $eq: varName }})
        .select('-_id -__v')
        .lean()
        .exec()
    );
  }
}
