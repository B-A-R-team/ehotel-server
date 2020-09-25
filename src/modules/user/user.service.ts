import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as crypto from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    user.pass = crypto.MD5(user.pass).toString();
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async loginByEmail(email: string, pass: string): Promise<boolean> {
    const password = crypto.MD5(pass).toString();
    const user = await this.findByEmail(email);
    if (user) {
      if (user.pass === password) {
        if (user.is_business) {
          return true;
        }
        throw '仅商家帐号可登陆后台';
      }
      throw '密码错误';
    }
    throw '用户不存在';
  }

  async findByopenid(openid: string): Promise<User> {
    return await this.userRepository.findOne({ openid });
  }

  async createByWX(nickname: string, avatar_url: string, openid: string) {
    return await this.create({
      nickname,
      avatar_url,
      openid,
      pass: '123456',
    } as User);
  }

  async changeIdentity(id: number, isbusiness: boolean) {
    const user = await this.findById(id);
    if (user.is_business) {
      throw '您已是商家';
    }
    return await this.userRepository.update(id, {
      is_business: isbusiness,
    });
  }
}
