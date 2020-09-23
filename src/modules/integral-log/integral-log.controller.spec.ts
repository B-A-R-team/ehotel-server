import { Test, TestingModule } from '@nestjs/testing';
import { IntegralLogController } from './integral-log.controller';

describe('IntegralLogController', () => {
  let controller: IntegralLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegralLogController],
    }).compile();

    controller = module.get<IntegralLogController>(IntegralLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
