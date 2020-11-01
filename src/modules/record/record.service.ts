import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Record, RecordStatus } from '../../entities/record.entity';
import { HotelService } from '../hotel/hotel.service';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { CreateRecordDto } from './record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly hotelService: HotelService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  async findByRecordId(recordId: number) {
    try {
      return await this.recordRepository.findOne({
        relations: ['hotel', 'room', 'user'],
        where: { recordId },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHotelId(hotelId: number) {
    try {
      const hotel = await this.hotelService.findById(hotelId);
      return await this.recordRepository.find({
        relations: ['hotel', 'room', 'user'],
        where: { hotel },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByRoomId(roomId: number) {
    try {
      const room = await this.roomService.findRoomById(roomId);
      return await this.recordRepository.find({
        relations: ['hotel', 'room', 'user'],
        where: { room },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUserId(userId: number) {
    try {
      const user = await this.userService.findById(userId);
      return await this.recordRepository.find({
        relations: ['hotel', 'room', 'user'],
        where: { user },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createRecordDto: CreateRecordDto) {
    try {
      const { hotel_id, room_id, user_id, ...recordInfo } = createRecordDto;
      const hotel = await this.hotelService.findById(hotel_id);
      const room = await this.roomService.findRoomById(room_id);
      const user = await this.userService.findById(user_id);

      recordInfo['hotel'] = hotel;
      recordInfo['room'] = room;
      recordInfo['user'] = user;
      recordInfo['price'] = room['new_price'] - recordInfo['coupon'];

      return await this.recordRepository.save(recordInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeRecord(recordId: number, is_close: boolean) {
    try {
      return await this.recordRepository.update(recordId, { is_close });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeRecordStatus(recordId: number, status: RecordStatus) {
    try {
      return await this.recordRepository.update(recordId, { status });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(recordId: number) {
    try {
      return await this.recordRepository.delete(recordId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
