import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.userService.loginByEmail(email, pass))) {
      return user;
    }
    return null;
  }

  async createToken(user: User) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async createTokenForWX(openid: string, session_key: string) {
    const payload = { username: session_key, sub: openid };
    return this.jwtService.sign(payload);
  }
}
