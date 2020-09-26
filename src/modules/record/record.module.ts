import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../../entities/record.entity';
import { HotelModule } from '../hotel/hotel.module';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    HotelModule,
    RoomModule,
    UserModule,
  ],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
