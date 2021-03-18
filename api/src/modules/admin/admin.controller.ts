import { BadGatewayException, Controller, Get, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { catchError, map } from 'rxjs/operators';
import { AppConfigService } from '@services/app-config/app-config.service';
import { VehicleVariablesService } from '@services/vehicle-variables/vehicle-variables.service';
// eslint-disable-next-line
import { VehicleVariableInterface } from '@interfaces/vehicle-variable';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly nhtsa: NHTSAService,
    private readonly i18n: I18nService,
    private readonly logger: AppLoggerService,
    private readonly appConfig: AppConfigService,
    private readonly vehicleVariables: VehicleVariablesService
  ) {
    this.logger.setContext(AdminController.name);
    this.i18n.changeLanguage('en');
  }

  @Post('nhtsa-variables')
  updateNHTSAVehicleVariables(): Observable<any> {
    return from(this.nhtsa.getVehicleVariables$())
      .pipe(
        map(async (data) => {
          const ns = this.appConfig.get<string>('services.nhtsa.i18n.namespace');
          const i18nRows = this.vehicleVariables.toI18nMongoFormat(
            data,
            this.appConfig.get<string>('services.nhtsa.i18n.namespace'),
            this.i18n.language
          );
          const variables = await this.vehicleVariables.store(data);
          const translations = await this.i18n.storeTranslations(i18nRows);
          await this.i18n.addTranslations(translations, ns);

          return {
            status: 'success',
            message: `Inserted ${translations.length} translations and ${variables.length} variables`
          };
        }),
        catchError((err) => {
          throw new BadGatewayException(err);
        })
      );
  }

  @Get('nhtsa-variables')
  getNHTSAVehicleVariables(): Observable<VehicleVariableInterface[]> {
    return this.vehicleVariables.all;
  }
}
