import { Controller, Get, Post } from '@nestjs/common';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { from, Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { catchError, map } from 'rxjs/operators';
import { AppConfigService } from '@services/app-config/app-config.service';
import { VehicleVariablesService } from '@services/vehicle-variables/vehicle-variables.service';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly api: ApiService,
    private readonly nhtsa: NHTSAService,
    private readonly i18n: I18nService,
    private readonly logger: AppLoggerService,
    private readonly appConfig: AppConfigService,
    private readonly vehicleVariables: VehicleVariablesService
  ) {
    this.logger.setContext(AdminController.name);
  }

  @Post('nhtsa-variables')
  updateNHTSAVehicleVariables(): Observable<any> {
    return from(this.nhtsa.getVehicleVariables$())
      .pipe(
        map(async (data) => {
          const ns = this.appConfig.get<string>('services.nhtsa.i18n.namespace');
          const rows = this.vehicleVariables.formatTranslationsI18n(
            data,
            this.appConfig.get<string>('services.nhtsa.i18n.namespace')
          );
          const stored = await this.i18n.storeTranslations(rows, ns);

          return {
            status: 'success',
            message: `Inserted ${stored.length} translations`
          };
        }),
        catchError((err) => err)
      );
  }

  @Get('nhtsa-variables')
  getNHTSAVehicleVariables(): Observable<any> {
    try {
      return this.nhtsa.queryVehicleVariables();
    } catch (err) {
      rethrow(err.message);
    }
  }
}
