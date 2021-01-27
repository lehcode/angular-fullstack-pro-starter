import { Test, TestingModule } from '@nestjs/testing';
import { NHTSAService } from './nhtsa.service';
import { HttpModule } from '@nestjs/common';

describe('NHTSAService', () => {
  let nhtsaService: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [NHTSAService]
    }).compile();

    nhtsaService = module.get<NHTSAService>(NHTSAService);
  });

  it('NHTSAService instance should be defined', () => {
    expect(nhtsaService).toBeDefined();
  });

  it.todo('should fetch vehicle variables JSON from NHTSA API');

  it.todo('should fetch vehicle variables values JSON from NHTSA API');

  it.todo('should query DB for NHTSA vehicle variables');
});
