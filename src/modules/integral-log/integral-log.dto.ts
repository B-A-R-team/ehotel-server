import { ApiProperty } from '@nestjs/swagger';
import { IntegralLog } from '../../entities/integral_log.entity';

export class CreateIntegralLogDto extends IntegralLog {
  @ApiProperty({ description: '是否为支出记录', example: false })
  is_out: boolean;

  @ApiProperty({ description: '支出积分记录', example: 10 })
  sell_count: number;

  @ApiProperty({ description: '备注', example: '备注测试测试' })
  remarks: string;

  @ApiProperty({ description: '用户ID', example: 1 })
  user_id: number;
}
