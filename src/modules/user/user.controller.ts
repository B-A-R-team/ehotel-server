import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import {
  RegisterDto,
  LoginByEmailDto,
  LoginResponseDto,
  LoginByWXDto,
} from './user.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { appid, appsecret } from '../../config/wxminapp.config';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  @ApiOperation({ summary: '获取所有用户' })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT',
  })
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/list/:id')
  @ApiOperation({ summary: '根据ID获取用户' })
  async getById(@Param() params: { id: number }) {
    return await this.userService.findById(params.id);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Web端注册' })
  async registerForWeb(@Body() user: RegisterDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Web端登陆' })
  async loginForWeb(@Body() user: LoginByEmailDto): Promise<LoginResponseDto> {
    const authResult = await this.authService.validateUser(
      user.email,
      user.pass,
    );
    if (authResult !== null) {
      const token = await this.authService.createToken(authResult);
      return {
        user: authResult,
        token: `Bearer ${token}`,
      };
    }
    return null;
  }

  @Post('/loginforwx')
  @ApiOperation({ summary: 'WX小程序端登陆' })
  async loginForWX(@Body() info: LoginByWXDto) {
    const response = await fetch(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${info.code}&grant_type=authorization_code`,
    );
    const result = await response.json();
    const { openid, session_key } = result;

    const token = await this.authService.createTokenForWX(openid, session_key);

    let user = await this.userService.findByopenid(openid);
    // 如果用户不存在，创建账户
    if (user === null) {
      user = await this.userService.createByWX(
        info.nickname,
        info.avatar_url,
        openid,
      );
    }

    return { user, token };
  }

  @Put('/tobusiness')
  @ApiOperation({ summary: '成为商家' })
  async toBusiness(@Body() id: number) {
    return await this.userService.changeIdentity(id, true);
  }

  @Put('/outbusiness')
  @ApiOperation({ summary: '退出商家' })
  async outBusiness(@Body() id: number) {
    return await this.userService.changeIdentity(id, false);
  }
}
