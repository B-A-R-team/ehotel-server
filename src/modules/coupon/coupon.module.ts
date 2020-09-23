import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from '../../entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
