import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class RegisterDto extends User {
  @ApiProperty({ description: '昵称', example: 'admin_test' })
  nickname: string;

  @ApiProperty({ description: '邮箱', example: '123456@email.com' })
  email: string;

  @ApiProperty({ description: '密码', example: '123456' })
  pass: string;
}

export class LoginByEmailDto extends User {
  @ApiProperty({ description: '邮箱', example: '123456@email.com' })
  email: string;

  @ApiProperty({ description: '密码', example: '123456' })
  pass: string;
}

export class LoginByWXDto extends User {
  @ApiProperty({ description: '微信昵称' })
  nickname: string;
  
  @ApiProperty({ description: '微信头像' })
  avatar_url: string;

  @ApiProperty({ description: '微信接口Code' })
  code: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: '用户数据' })
  user: User;

  @ApiProperty({ description: 'token' })
  token: string;
}
