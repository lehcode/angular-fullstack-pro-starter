import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { AdminController } from '@admin/admin.controller';
import { ApiService } from '@services/api/api.service';
import { NHTSAService } from '@services/nhtsa/nhtsa.service';
import { VehicleVariable } from '@services/mongoose/schemas/vehicle-variable.schema';
import * as vehicleVariablesResponse from '@services/nhtsa/__stubs__/vehicle-variables-response.json';
import NHTSAServiceMock from '@services/nhtsa/__mocks__/nhtsa.service';

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
    })
      .compile();

    adminController = module.get<AdminController>(AdminController);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(adminController)
      .toBeDefined();
    expect(nhtsaService)
      .toBeDefined();
  });

  it('getNHTSAVehicleVariables() should return vehicle variables JSON', async () => {
    jest.spyOn(adminController, 'getNHTSAVehicleVariables')
      .mockImplementation(() => vehicleVariablesResponse as any);

    expect(await adminController.getNHTSAVehicleVariables())
      .toEqual(vehicleVariablesResponse);
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
