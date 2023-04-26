import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import * as vehicleVariables from '@services/nhtsa/__stubs__/vehicle-variables.json';
import ApiServiceMock from './__mocks__/api.service';
import { ConfigService } from '@nestjs/config';
import { LocaleService } from '@services/locale/locale.service';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        ConfigService,
        LocaleService
      ]
    })
      .compile();

    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(apiService)
      .toBeDefined();
  });
});
