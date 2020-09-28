import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Active } from '../../entities/active.entity';
import { CreateAndUpdateActiveDto } from './active.dto';
import { HotelService } from '../hotel/hotel.service';

@Injectable()
export class ActiveService {
  constructor(
    @InjectRepository(Active)
    private readonly activeRepository: Repository<Active>,
    private readonly hotelService: HotelService,
  ) {}

  async findAll() {
    try {
      return await this.activeRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number) {
    try {
      return await this.activeRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHotelId(hotelId: number) {
    try {
      const hotel = await this.hotelService.findById(hotelId);
      return await this.activeRepository.find({ hotel });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createActiveDto: CreateAndUpdateActiveDto) {
    try {
      const { hotel_id, ...activeInfo } = createActiveDto;
      const hotel = await this.hotelService.findById(hotel_id);
      activeInfo['hotel'] = hotel;
      return await this.activeRepository.save(activeInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateActiveDto: CreateAndUpdateActiveDto) {
    try {
      const { hotel_id, ...activeInfo } = updateActiveDto;
      // 如果传入的酒店ID与原本的酒店ID不同，则更新酒店数据
      if (hotel_id !== activeInfo.hotel.id) {
        const hotel = await this.hotelService.findById(hotel_id);
        activeInfo['hotel'] = hotel;
      }
      return await this.activeRepository.update(id, activeInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      return await this.activeRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
