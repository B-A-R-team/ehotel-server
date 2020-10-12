import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Hotel } from '../../entities/hotel.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      return await this.hotelRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number) {
    try {
      return await this.hotelRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByTitle(title: string) {
    try {
      return await this.hotelRepository.find({ title });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSwiperList(id: number) {
    try {
      const hotel = await this.findById(id);
      return hotel.swiperList;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(hotel: Hotel, ownerId: number) {
    try {
      const user = await this.userService.findById(ownerId);
      hotel.owners = hotel.owners ? [...hotel.owners, user] : [user];
      return await this.hotelRepository.save(hotel);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, hotel: QueryDeepPartialEntity<Hotel>) {
    try {
      return await this.hotelRepository.update(id, { ...hotel });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateSwiperList(id: number, swiperList: string[]) {
    try {
      return await this.update(id, { swiperList });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 添加轮播图
   * @param id 酒店ID
   * @param swiper_url 轮播图路径
   */
  async addSwiper(id: number, swiper_url: string) {
    try {
      const hotel = await this.findById(id);
      if (hotel['swiperList']) {
        hotel['swiperList'] = [swiper_url, ...hotel['swiperList']];
      } else {
        hotel['swiperList'] = [swiper_url];
      }
      return await this.update(id, hotel);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      return this.hotelRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
