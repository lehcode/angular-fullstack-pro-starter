import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './services/api/api.service';
import { NHTSAService } from './services/nhtsa/nhtsa.service';
import { HttpModule } from '@nestjs/common';
import { VehicleVariable } from './services/nhtsa/schemas/vehicle-variable.schema';
import NHTSAServiceMock from './services/nhtsa/__mocks__/nhtsa.service';
import ApiServiceMock from './services/api/__mocks__/api.service';
import { ConfigService } from '@nestjs/config';
import { LocaleService } from './services/locale/locale.service';

describe('ApiController', () => {
  let controller: ApiController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ApiController],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        { provide: NHTSAService, useClass: NHTSAServiceMock },
        { provide: 'VehicleVariableModel', useClass: VehicleVariable },
        ConfigService,
        LocaleService
      ]
    }).compile();

    controller = module.get<ApiController>(ApiController);
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(apiService).toBeDefined();
  });

  it.skip('should call updateNHTSAVehicleVariables()', async () => {
    // jest.spyOn(controller, 'updateNHTSAVehicleVariables')
    // .mockImplementation(() => Object.create(vehicleVarsJSON));
    //
    // expect(await controller.updateNHTSAVehicleVariables())
    // .toEqual(vehicleVarsJSON);
  });
});
