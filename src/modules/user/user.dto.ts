import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class RegisterDto extends User {
  @ApiProperty({ description: '昵称' })
  nickname: string;
  @ApiProperty({ description: '邮箱' })
  email: string;
  @ApiProperty({ description: '密码' })
  pass: string;
}
