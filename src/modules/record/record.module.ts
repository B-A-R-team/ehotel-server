import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../../entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
