import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Active } from '../../entities/active.entity';
import { HotelModule } from '../hotel/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Active]), HotelModule],
  providers: [ActiveService],
  controllers: [ActiveController],
})
export class ActiveModule {}
