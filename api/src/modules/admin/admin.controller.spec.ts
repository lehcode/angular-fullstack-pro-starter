import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { ApiService } from '../api/services/api/api.service';
import { NHTSAService } from '../api/services/nhtsa/nhtsa.service';
import { VehicleVariable } from '../api/services/nhtsa/schemas/vehicle-variable.schema';
import { HttpModule } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AdminController],
      providers: [
        ApiService,
        NHTSAService,
        {
          provide: 'VehicleVariableModel',
          useClass: VehicleVariable
        }
      ]
    }).compile();

    controller = module.get<AdminController>(AdminController);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(nhtsaService).toBeDefined();
  });

  it.skip('updateNHTSAVehicleVariables() should resolve to rows', () => {
    jest.spyOn(controller, 'updateNHTSAVehicleVariables');
  });

  it.todo('updateNHTSAVehicleVariables() should response with error object');
});
