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

export class BalanceDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number;

  @ApiProperty({ description: '金额', example: 20 })
  money: number;
}

export class VipChangeDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number;

  @ApiProperty({ description: '姓名', example: '小明' })
  name?: string;

  @ApiProperty({ description: '电话号', example: '15615615484' })
  phone?: string;
}

export class IntegralChangeDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number;

  @ApiProperty({ description: '积分', example: 20 })
  integral: number;
}
