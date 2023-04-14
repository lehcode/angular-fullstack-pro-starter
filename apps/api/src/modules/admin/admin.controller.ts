import { BadGatewayException, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { I18nService } from '@services/i18n/i18n.service';
import { AppLoggerService } from '@services/app-logger/app-logger.service';
import { AppConfigService } from '@services/app-config/app-config.service';
import { VehicleVariablesService } from '@services/vehicle-variables/vehicle-variables.service';
import { VehicleVariableInterface } from '@interfaces/vehicle-variable';
import { AuthGuard } from '@nestjs/passport';
@Controller('api/admin')
export class AdminController {
    constructor(
        private readonly nhtsa: NHTSAService,
        private readonly i18n: I18nService,
        private readonly logger: AppLoggerService,
        private readonly appConfig: AppConfigService,
        private readonly vehicleVariables: VehicleVariablesService
    ) {
        // this.logger.setContext(AdminController.name);
        this.i18n.changeLanguage('en');
    }
    @UseGuards(AuthGuard('jwt'))
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
        try {
          const variables = await this.vehicleVariables.store(data);
          const translations = await this.i18n.storeTranslations(i18nRows);
          await this.i18n.addTranslations(translations, ns);
          if (!this.validateInput(data)) {
            throw new BadGatewayException('Invalid user input');
          }
          return {
            status: 'success',
            message: `Inserted ${translations.length} translations and ${variables.length} variables`
          };
        } catch (err) {
          throw new BadGatewayException(err);
        }
      }),
      catchError((err: any) => {
        throw new BadGatewayException(err);
      })
    );
}
    @UseGuards(AuthGuard('jwt'))
    @Get('nhtsa-variables')
    getNHTSAVehicleVariables(): Observable<VehicleVariableInterface[]> {
        return this.vehicleVariables.all;
    }
    // Validate user input
    private validateInput(data: any): boolean {
// Add validation logic here
        return true;
    }
}