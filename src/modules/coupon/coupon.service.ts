import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from '../../entities/coupon.entity';
import { CreateAndUpdateCouponDto } from './coupon.dto';
import { HotelService } from '../hotel/hotel.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    private readonly hotelService: HotelService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      return await this.couponRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number) {
    try {
      return await this.couponRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHotelId(hotelId: number) {
    try {
      const hotel = await this.hotelService.findById(hotelId);
      return await this.couponRepository.find({ hotel });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUserId(userId: number) {
    try {
      const user = await this.userService.findById(userId);
      return await this.couponRepository.find({ user });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createCouponDto: CreateAndUpdateCouponDto) {
    try {
      const { hotel_id, user_id, ...couponInfo } = createCouponDto;
      const hotel = await this.hotelService.findById(hotel_id);
      const user = await this.userService.findById(user_id);
      couponInfo['hotel'] = hotel;
      couponInfo['user'] = user;
      return await this.couponRepository.save(couponInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCouponDto: CreateAndUpdateCouponDto) {
    try {
      const { hotel_id, user_id, ...couponInfo } = updateCouponDto;
      return await this.couponRepository.update(id, couponInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async setUsed(id: number) {
    try {
      return await this.couponRepository.update(id, { is_used: true });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      return await this.couponRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
