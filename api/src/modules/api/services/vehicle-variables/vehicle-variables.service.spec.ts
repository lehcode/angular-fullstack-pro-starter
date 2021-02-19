import { Test, TestingModule } from '@nestjs/testing';
import { VehicleVariablesService } from './vehicle-variables.service';

describe('VehicleVariablesService', () => {
  let service: VehicleVariablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleVariablesService],
    })
      .compile();

    service = module.get<VehicleVariablesService>(VehicleVariablesService);
  });

  it('should be defined', () => {
    expect(service)
      .toBeDefined();
  });
});
