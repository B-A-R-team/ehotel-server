import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import { CreateAndUpdateHotelDto, UpdateSwiperDto } from './hotel.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('酒店接口')
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('/list')
  @ApiOperation({ summary: '获取所有酒店' })
  async getAll() {
    return await this.hotelService.findAll();
  }

  @Get('/list/:id')
  @ApiOperation({ summary: '根据ID获取酒店' })
  async getById(@Param('id') id: number) {
    return await this.hotelService.findById(id);
  }

  @Get('/getbytitle')
  @ApiOperation({ summary: '根据酒店名获取酒店' })
  async getByTitle(@Query('title') title: string) {
    return await this.hotelService.findByTitle(title);
  }

  @Get('/swiper/:id')
  @ApiOperation({ summary: '获取酒店轮播图' })
  async getSwiperList(@Param('id') id: number) {
    return this.hotelService.getSwiperList(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @ApiOperation({ summary: '创建酒店' })
  @ApiBearerAuth()
  async create(@Body() hotel: CreateAndUpdateHotelDto) {
    const { owner_id, ...hotelInfo } = hotel;
    return await this.hotelService.create(hotelInfo, owner_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新酒店' })
  async update(
    @Query('id') id: number,
    @Body() hotel: CreateAndUpdateHotelDto,
  ) {
    return await this.hotelService.update(id, hotel);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/swiper')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新轮播图' })
  async updateSwiper(
    @Query('id') id: number,
    @Body() updateSwiperDto: UpdateSwiperDto,
  ) {
    return await this.hotelService.updateSwiperList(
      id,
      updateSwiperDto['swiperList'],
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除酒店' })
  async delete(@Param('id') id: number) {
    return await this.hotelService.delete(id);
  }
}
