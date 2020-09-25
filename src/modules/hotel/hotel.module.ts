import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from '../../entities/hotel.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), UserModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
