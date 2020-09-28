import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from '../../entities/coupon.entity';
import { UserModule } from '../user/user.module';
import { HotelModule } from '../hotel/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), UserModule, HotelModule],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
