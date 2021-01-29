import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from '../../services/api/api.service';
import { NHTSAService } from '../../services/nhtsa/nhtsa.service';
import { HttpModule } from '@nestjs/common';
import * as vehicleVars from '../../testing/vehicle-variables.json';

describe('ApiController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        ApiService,
        NHTSAService
      ],
      imports: [HttpModule]
    })
    .compile();

    apiController = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(apiController)
    .toBeDefined();
  });

  it.todo('should process POST request to /api/admin/nhtsa-update-variables');

  // it.skip('should process GET request to /api/vin endpoint', async () => {
  //   jest.spyOn(apiController, 'vehicleVariables')
  //   .mockImplementation(() => Object.create(vehicleVars));
  //
  //   expect(await apiController.vehicleVariables())
  //   .toEqual(vehicleVars);
  // });

  it.todo('should update NHTSA variables and values collections in DB');
});
