import { ApiProperty } from '@nestjs/swagger';
import { Coupon } from '../../entities/coupon.entity';

export class CreateAndUpdateCouponDto extends Coupon {
  @ApiProperty({ description: '优惠券名', example: '五一优惠' })
  label: string;

  @ApiProperty({ description: '是否为满减', example: true })
  is_full_down: boolean;

  @ApiProperty({ description: '满多少钱', example: 100 })
  limit_price: number;

  @ApiProperty({ description: '减多少钱', example: 20 })
  reduce_price: number;

  @ApiProperty({ description: '开始时间', example: 1601304584014 })
  start_time: Date;

  @ApiProperty({ description: '结束时间', example: 1601404584014 })
  end_time: Date;

  @ApiProperty({ description: '备注', example: '无备注' })
  remarks: string;

  @ApiProperty({ description: '所属酒店ID', example: 1 })
  hotel_id: number;

  @ApiProperty({ description: '所属用户ID', example: 1 })
  user_id: number;

  @ApiProperty({ description: '是否已经使用', example: false })
  is_used: boolean;
}
