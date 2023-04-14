import { Test, TestingModule } from '@nestjs/testing';
import { LocaleService } from './locale.service';
import { ConfigService } from '@nestjs/config';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, LocaleService]
    })
      .compile();

    service = module.get<LocaleService>(LocaleService);
  });

  it('should be defined', () => {
    expect(service)
      .toBeDefined();
  });
});
