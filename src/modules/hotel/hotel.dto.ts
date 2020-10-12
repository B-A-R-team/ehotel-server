import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from '../../entities/hotel.entity';

export class CreateAndUpdateHotelDto extends Hotel {
  @ApiProperty({
    description: '轮播图地址',
    example: ['static/1.png', 'static/2.png'],
  })
  swiperList: string[];

  @ApiProperty({ description: '酒店名', example: '测试酒店名' })
  title: string;

  @ApiProperty({ description: '地址', example: '世界尽头' })
  address: string;

  @ApiProperty({ description: '电话', example: '12365478954' })
  phone: string;

  @ApiProperty({ description: '开门时间', example: '08:00' })
  open_time: string;

  @ApiProperty({ description: '关门时间', example: '22:00' })
  end_time: string;

  @ApiProperty({ description: '简介', example: '测试酒店简介' })
  desc: string;

  @ApiProperty({ description: '维度', example: 30 })
  latitude: number;

  @ApiProperty({ description: '精度', example: 100 })
  longitude: number;

  @ApiProperty({ description: '所有者ID', example: 1, required: false })
  owner_id?: number;
}

export class UpdateSwiperDto {
  @ApiProperty({
    description: '轮播图地址',
    example: ['/public/upload/1.png', '/public/upload/2.png'],
  })
  swiperList: string[];
}

export class AddSwiperDto {
  @ApiProperty({ description: '酒店ID', example: 1 })
  id: number;
  
  @ApiProperty({
    description: '图片地址',
    example: '/public/upload/1.png',
  })
  swiper_url: string;
}
