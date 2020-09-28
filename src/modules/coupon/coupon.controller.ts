import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { CreateAndUpdateCouponDto } from './coupon.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('优惠券接口')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get('/list')
  @ApiOperation({ summary: '获取所有优惠券' })
  async getAll() {
    return this.couponService.findAll();
  }

  @Get('/list/:id')
  @ApiOperation({ summary: '根据ID获取优惠券' })
  async getById(@Param('id') id: number) {
    return this.couponService.findById(id);
  }

  @Get('/getby/hotel/:id')
  @ApiOperation({ summary: '根据酒店ID获取优惠券' })
  async getByHotel(@Param('id') id: number) {
    return this.couponService.findByHotelId(id);
  }

  @Get('/getby/user/:id')
  @ApiOperation({ summary: '根据用户ID获取优惠券' })
  async getByUser(@Param('id') id: number) {
    return this.couponService.findByUserId(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建优惠券' })
  async create(@Body() createCouponDto: CreateAndUpdateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新优惠券' })
  async update(
    @Param('id') id: number,
    @Body() updateCouponDto: CreateAndUpdateCouponDto,
  ) {
    return this.couponService.update(id, updateCouponDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/setused/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '将优惠券标记为已经使用' })
  async setUsed(@Param('id') id: number) {
    return this.couponService.setUsed(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除优惠券' })
  async delete(@Param('id') id: number) {
    return this.couponService.delete(id);
  }
}
