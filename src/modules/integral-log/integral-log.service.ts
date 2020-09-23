import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegralLog } from '../../entities/integral_log.entity';

@Injectable()
export class IntegralLogService {
  constructor(
    @InjectRepository(IntegralLog)
    private readonly integralLogRepository: Repository<IntegralLog>,
  ) {}
}
