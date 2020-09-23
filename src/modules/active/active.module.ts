import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Active } from '../../entities/active.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Active])],
  providers: [ActiveService],
  controllers: [ActiveController],
})
export class ActiveModule {}
