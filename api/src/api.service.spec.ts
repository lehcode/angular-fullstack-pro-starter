import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { NHTSAService } from './services/nhtsa/nhtsa.service';
import { HttpModule } from '@nestjs/common';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ApiService,
        NHTSAService
      ]
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('nhtsaVehicleVariables() should provide vehicle variables');
});
