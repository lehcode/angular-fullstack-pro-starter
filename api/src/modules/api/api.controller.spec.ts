import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from '../../services/api/api.service';
import { NHTSAService } from '../../services/nhtsa/nhtsa.service';
import { HttpModule } from '@nestjs/common';
import * as vehicleVarsJSON from '../../testing/vehicle-variables.json';
import { VehicleVariable } from '../../services/nhtsa/schemas/vehicle-variable.schema';

describe('ApiController', () => {
  let apiController: ApiController;
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        ApiService,
        NHTSAService,
        {
          provide: 'VehicleVariableModel',
          useClass: VehicleVariable,
        }
      ],
      imports: [HttpModule]
    })
      .compile();

    apiController = module.get<ApiController>(ApiController);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(apiController).toBeDefined();
  });

  it('NHTSA service should be defined', () => {
    expect(nhtsaService).toBeDefined();
  });

  // it.skip('should process GET request to /api/vin endpoint', async () => {
  //   jest.spyOn(apiController, 'vehicleVariables')
  //   .mockImplementation(() => Object.create(vehicleVars));
  //
  //   expect(await apiController.vehicleVariables())
  //   .toEqual(vehicleVars);
  // });

  it('updateNHTSAVehicleVariables() should resolve to rows', () => {
    jest.spyOn(apiController, 'updateNHTSAVehicleVariables');
  });

  it.todo('updateNHTSAVehicleVariables() should response with error object');
});
