import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [I18nService],
    })
      .compile();

    service = module.get<I18nService>(I18nService);
  });

  it('should be defined', () => {
    expect(service)
      .toBeDefined();
  });
});
