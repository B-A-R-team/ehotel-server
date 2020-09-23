import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType, Room } from '../../entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, Room])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
