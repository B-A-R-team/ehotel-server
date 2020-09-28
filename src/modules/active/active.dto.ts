import { ApiProperty } from '@nestjs/swagger';
import { Active } from '../../entities/active.entity';

export class CreateAndUpdateActiveDto extends Active {
  @ApiProperty({ description: '标题/主题', example: '测试标题' })
  topic: string;

  @ApiProperty({ description: '宣传小图', example: 'public/upload/1.png' })
  img_url: string;

  @ApiProperty({ description: '开始时间', example: '2020/9/20' })
  start_time: string;

  @ApiProperty({ description: '结束时间', example: '2020/9/30' })
  end_time: string;

  @ApiProperty({ description: '活动详情HTML', example: '<p>测试详情</p>' })
  detail: string;

  @ApiProperty({ description: '活动简介', example: '这是活动简介' })
  desc: string;

  @ApiProperty({ description: '酒店ID', example: 1 })
  hotel_id: number;
}
