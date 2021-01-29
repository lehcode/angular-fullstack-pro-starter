import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';
import { NHTSAService } from '../nhtsa/nhtsa.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ApiService,
        NHTSAService
      ]
    }).compile();

    apiService = module.get<ApiService>(ApiService);
    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('ApiService instance should be defined', () => {
    expect(apiService).toBeDefined();
  });

  it('NHTSAService instance should be defined', () => {
    expect(nhtsaService).toBeDefined();
  });

  it.todo('should make GET API call without parameters');

  it.todo('should make GET API call with parameters');

  it.todo('should make POST API call without payload');

  it.todo('should make POST API call with payload');
});
