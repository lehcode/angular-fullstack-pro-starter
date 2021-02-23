import { Test, TestingModule } from '@nestjs/testing';
import { AppLoggerService } from './app-logger.service';

describe('AppLoggerService', () => {
  let service: AppLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppLoggerService],
    })
      .compile();

    service = module.get<AppLoggerService>(AppLoggerService);
  });

  it('should be defined', () => {
    expect(service)
      .toBeDefined();
  });
});
