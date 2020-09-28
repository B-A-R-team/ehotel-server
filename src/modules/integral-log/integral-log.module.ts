import { Module } from '@nestjs/common';
import { IntegralLogService } from './integral-log.service';
import { IntegralLogController } from './integral-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegralLog } from '../../entities/integral_log.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([IntegralLog]), UserModule],
  providers: [IntegralLogService],
  controllers: [IntegralLogController],
})
export class IntegralLogModule {}
