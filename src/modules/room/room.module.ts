import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType, Room } from '../../entities/room.entity';
import { HotelModule } from '../hotel/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, Room]), HotelModule],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
