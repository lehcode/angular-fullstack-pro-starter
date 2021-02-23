import { Test, TestingModule } from '@nestjs/testing';
import { MongooseService } from './mongoose.service';

describe('MongooseService', () => {
  let service: MongooseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseService],
    })
      .compile();

    service = module.get<MongooseService>(MongooseService);
  });

  it('should be defined', () => {
    expect(service)
      .toBeDefined();
  });
});
