import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AdminController } from '@admin/admin.controller';
import { ApiService } from '@services/api/api.service';

jest.mock('./admin.controller');

describe('AdminController', () => {
  let adminController: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AdminController],
      providers: [
        ApiService
      ]
    })
      .compile();

    adminController = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(adminController)
      .toBeDefined();
  });
});
