import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { RegisterDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('/register')
  async registerForWeb(@Body() user: RegisterDto): Promise<User> {
    return this.userService.create(user);
  }
}
