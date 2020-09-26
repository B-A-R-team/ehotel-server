import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room, RoomType } from '../../entities/room.entity';
import { CreateAndUpdateRoomDto, CreateAndUpdateTypeDto } from './room.dto';
import { HotelService } from '../hotel/hotel.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomType)
    private readonly roomTypeRepository: Repository<RoomType>,
    private readonly hotelService: HotelService,
  ) {}

  async findAll() {
    try {
      return await this.roomRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findRoomById(id: number) {
    try {
      return await this.roomRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 根据类型ID查找房间
   * @param typeId 类型ID
   */
  async findRoomByType(typeId: number) {
    try {
      const type = await this.findTypeById(typeId);
      return await this.roomRepository.find({ type });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 获取所有房间类型
   */
  async findAllType() {
    try {
      return await this.roomTypeRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findTypeById(id: number) {
    try {
      return await this.roomTypeRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 创建房间类型
   * @param type 房间类型
   */
  async createType(createTypeDto: CreateAndUpdateTypeDto) {
    try {
      return await this.roomTypeRepository.save(createTypeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createRoom(createRoomDto: CreateAndUpdateRoomDto) {
    try {
      const { typeId, hotelId, ...roomInfo } = createRoomDto;
      const type = await this.findTypeById(createRoomDto['typeId']);
      const hotel = await this.hotelService.findById(createRoomDto['hotelId']);
      roomInfo['hotel'] = hotel;
      roomInfo['type'] = type;
      return await this.roomRepository.save(roomInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update Type Info By Type ID
   * @param id Type ID
   * @param updateTypeDto New Type Info
   */
  async updateType(id: number, updateTypeDto: CreateAndUpdateTypeDto) {
    try {
      return await this.roomTypeRepository.update(id, updateTypeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRoom(id: number, updateRoomDto: CreateAndUpdateRoomDto) {
    try {
      return await this.roomRepository.update(id, updateRoomDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete Type Info By Type ID
   * @param id Type ID
   */
  async deleteType(id: number) {
    try {
      return await this.roomTypeRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteRoom(id: number) {
    try {
      return await this.roomRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
