import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { ApiService } from '../api/services/api/api.service';
import { NHTSAService } from '../api/services/nhtsa/nhtsa.service';
import { VehicleVariable } from '../api/services/nhtsa/schemas/vehicle-variable.schema';
import { HttpModule } from '@nestjs/common';
import * as vehicleVariablesResponse from '../api/services/nhtsa/__stubs__/vehicle-variables-response.json';
import NHTSAServiceMock from '../api/services/nhtsa/__mocks__/nhtsa.service';

jest.mock('./admin.controller');

describe('AdminController', () => {
  let adminController: AdminController;
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AdminController],
      providers: [
        ApiService,
        {
          provide: NHTSAService,
          useClass: NHTSAServiceMock
        },
        {
          provide: 'VehicleVariableModel',
          useClass: VehicleVariable
        }
      ]
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(adminController).toBeDefined();
    expect(nhtsaService).toBeDefined();
  });

  it('getNHTSAVehicleVariables() should return vehicle variables JSON', async () => {
    jest.spyOn(adminController, 'getNHTSAVehicleVariables')
      .mockImplementation(() => vehicleVariablesResponse as any);

    expect(await adminController.getNHTSAVehicleVariables()).toEqual(vehicleVariablesResponse);
  });

  it.todo('getNHTSAVehicleVariables() should respond with error');

  // it('updateNHTSAVehicleVariables() should issue success response', async () => {
  //   jest.spyOn(adminController, 'updateNHTSAVehicleVariables')
  //     .mockImplementation(() => successResponse as any);
  //
  //   expect(await adminController.updateNHTSAVehicleVariables()).toEqual(successResponse);
  // });

  it.todo('getNHTSAVehicleVariables() should respond with error');
});
