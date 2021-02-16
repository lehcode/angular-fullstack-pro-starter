import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { VehicleVariable } from '../nhtsa/schemas/vehicle-variable.schema';
import * as vehicleVariables from '../nhtsa/__stubs__/vehicle-variables.json';
import ApiServiceMock from './__mocks__/api.service';
import { ConfigService } from '@nestjs/config';
import { LocaleService } from '../locale/locale.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        NHTSAService,
        { provide: 'VehicleVariableModel', useClass: VehicleVariable },
        ConfigService,
        LocaleService
      ]
    })
      .compile();

    apiService = module.get<ApiService>(ApiService);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(apiService)
      .toBeDefined();
    expect(nhtsaService)
      .toBeDefined();
  });

  it('getNHTSAVehicleVariables() should resolve to vehicle variables', async () => {
    jest.spyOn(apiService, 'getNHTSAVehicleVariables');

    expect(await apiService.getNHTSAVehicleVariables())
      .toEqual(vehicleVariables);
  });
});
