import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';
import { VehicleVariable } from '../nhtsa/schemas/vehicle-variable.schema';

describe('ApiService', () => {
  let apiService: ApiService;
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ApiService,
        NHTSAService,
        {
          provide: 'VehicleVariableModel',
          useClass: VehicleVariable
        }
      ]
    }).compile();

    apiService = module.get<ApiService>(ApiService);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(apiService).toBeDefined();
  });

  it('NHTSAService should be defined', () => {
    expect(nhtsaService).toBeDefined();
  });

  it.todo('getVehicleVariables() should return Observable');

  it.todo('storeVehicleVariables() should return resolved rows array');

  it.todo('nhtsaVehicleVariables() should return Promise with data');
});
