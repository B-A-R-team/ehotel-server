import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/entities/room.entity';
import { RoomType } from '../../entities/room.entity';

export class CreateAndUpdateRoomDto extends Room {
  @ApiProperty({ description: '房间名', example: '测试大床房' })
  title: string;

  @ApiProperty({ description: '房间门牌号', example: 'S101' })
  room_num: string;

  @ApiProperty({ description: '房间价格', example: 100 })
  new_price: number;

  @ApiProperty({ description: '房间简介', example: '测试房间简介' })
  desc: string;

  @ApiProperty({
    description: '房间介绍图',
    example: '["/public/upload/default_room.jpg"]',
  })
  img_url: string;

  @ApiProperty({
    description: '房间配置信息',
    example:
      '{"area":"45","people_count":"2","bed_count":"2","bathroom":"干湿分离 独立浴室 独立卫生间","computer_count":"2","floor":"11-12"}',
  })
  room_info: string;

  @ApiProperty({
    description: '电脑配置信息',
    example:
      '{"cpu":"i5-9400F","gpu":"ITX2080","device":"华硕 VG27VQE","mainboard":"华硕 13365","memory":"金士顿16G","keyboard":"黑峡谷K735机械键盘","mouse":"罗技402","earphone":"雷蛇北海巨妖"}',
  })
  computer_info: string;

  @ApiProperty({ description: '房型ID', example: 1 })
  typeId: number;

  @ApiProperty({ description: '酒店ID', example: 1 })
  hotelId: number;
}

export class CreateAndUpdateTypeDto extends RoomType {
  @ApiProperty({ description: '房间类型名', example: '大床房' })
  type_name: string;

  @ApiProperty({ description: '楼层', example: ['11', '12'] })
  floor: string[];

  @ApiProperty({ description: '面积', example: 20 })
  area: number;
}
