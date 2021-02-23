import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
// eslint-disable-next-line
import { VehicleVariableDocument } from '@services/nhtsa/interfaces/vehicle-variable.document';
import { VehicleVariable } from '@services/nhtsa/schemas/vehicle-variable.schema';
import { VehicleVariableInterface } from '@services/nhtsa/interfaces/vehicle-variable.interface';
import { I18nService } from '@services/i18n/i18n.service';
import { AppConfigService } from '@services/app-config/app-config.service';


@Injectable()
export class VehicleVariablesService {
  private readonly logger = new Logger(VehicleVariablesService.name);

  constructor(
    private readonly i18n: I18nService,
    private readonly config: AppConfigService,
    @InjectModel(VehicleVariable.name) private vehicleVariables: Model<VehicleVariableDocument>
  ) {}

  /**
   * Save NHTSA vehicle variables to DB
   */
  async store(data: VehicleVariableInterface[]): Promise<VehicleVariableInterface[]> {
    await this.vehicleVariables.deleteMany({});
    await this.vehicleVariables.insertMany(data);
    this.logger.log(`Inserted ${data.length} records`);

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
        .findOne({ varId: varId, name: { $eq: I18nService.key(varName) }})
        .select('-_id -__v')
        .lean()
        .exec()
    );
  }

  saveTranslation(lang: string, ns: string, data: Record<string, string>): void {
    this.i18n.addResources(lang, ns, data);
  }
}
