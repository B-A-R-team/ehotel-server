import { Controller } from '@nestjs/common';
import { IntegralLogService } from './integral-log.service';

@Controller('integral-log')
export class IntegralLogController {
  constructor(private readonly integralLogService: IntegralLogService) {}
}
