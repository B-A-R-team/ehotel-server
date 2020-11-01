import { ApiProperty } from '@nestjs/swagger';
import { Record, RecordStatus } from '../../entities/record.entity';

export class CreateRecordDto extends Record {
  @ApiProperty({ description: '酒店ID', example: 1 })
  hotel_id: number;

  @ApiProperty({ description: '房间ID', example: 1 })
  room_id: number;

  @ApiProperty({ description: '用户ID', example: 1 })
  user_id: number;

  @ApiProperty({
    description: '成员信息',
    example: '{"name":"xmy", "id_card": "102938475647382943"}',
  })
  member_message: string;

  @ApiProperty({ description: '备注', example: '备注信息测试' })
  remarks: string;

  @ApiProperty({ description: '优惠价格', example: 10 })
  coupon: number;

  @ApiProperty({
    description: '订单状态(默认为WAITING)',
    example: RecordStatus['WAITING'],
  })
  status: RecordStatus;
}

export class UpdateStatusDto {
  @ApiProperty({ description: '订单ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '订单状态',
    example: RecordStatus['FINISH'],
  })
  status: RecordStatus;
}
