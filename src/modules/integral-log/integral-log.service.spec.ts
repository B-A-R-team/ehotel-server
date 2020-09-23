import { Test, TestingModule } from '@nestjs/testing';
import { IntegralLogService } from './integral-log.service';

describe('IntegralLogService', () => {
  let service: IntegralLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegralLogService],
    }).compile();

    service = module.get<IntegralLogService>(IntegralLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
