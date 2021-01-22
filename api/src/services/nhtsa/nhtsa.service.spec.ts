import { Test, TestingModule } from '@nestjs/testing';
import { NHTSAService } from './nhtsa.service';
import { HttpModule } from '@nestjs/common';

describe('NHTSAService', () => {
  let service: NHTSAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [NHTSAService],
      exports: [HttpModule]
    }).compile();

    service = module.get<NHTSAService>(NHTSAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('should fetch NHTSA vehicle variables JSON');
});
