import { Test, TestingModule } from '@nestjs/testing';
import { ActiveController } from './active.controller';

describe('ActiveController', () => {
  let controller: ActiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveController],
    }).compile();

    controller = module.get<ActiveController>(ActiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
