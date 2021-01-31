import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './services/api/api.service';
import { NHTSAService } from './services/nhtsa/nhtsa.service';
import { HttpModule } from '@nestjs/common';
// import * as vehicleVarsJSON from '../../testing/vehicle-variables.json';
import { VehicleVariable } from './services/nhtsa/schemas/vehicle-variable.schema';

describe('ApiController', () => {
  let controller: ApiController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ApiController],
      providers: [
        ApiService,
        NHTSAService,
        {
          provide: 'VehicleVariableModel',
          useClass: VehicleVariable
        }
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
