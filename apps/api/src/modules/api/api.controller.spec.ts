import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from '@services/api/api.service';
import { HttpModule } from '@nestjs/axios';
import ApiServiceMock from '@services/api/__mocks__/api.service';
import { ConfigService } from '@nestjs/config';
import { LocaleService } from '@services/locale/locale.service';

describe('ApiController', () => {
  let controller: ApiController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ApiController],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        ConfigService,
        LocaleService
      ]
    })
      .compile();

    controller = module.get<ApiController>(ApiController);
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(controller)
      .toBeDefined();
    expect(apiService)
      .toBeDefined();
  });
});
