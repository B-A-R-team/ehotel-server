import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(user: User): Promise<User> {
    try {
      user.pass = crypto.MD5(user.pass).toString();
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async loginByEmail(email: string, pass: string): Promise<boolean> {
    try {
      const password = crypto.MD5(pass).toString();
      const user = await this.findByEmail(email);
      if (user) {
        if (user.pass === password) {
          if (user.is_business) {
            return true;
          }
          throw new HttpException(
            '仅商家帐号可登陆后台',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByopenid(openid: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ openid });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createByWX(nickname: string, avatar_url: string, openid: string) {
    try {
      return await this.create({
        nickname,
        avatar_url,
        openid,
        pass: '123456',
      } as User);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeIdentity(id: number, isbusiness: boolean) {
    try {
      const user = await this.findById(id);
      if (user.is_business && isbusiness) {
        throw new HttpException('您已是商家', HttpStatus.BAD_REQUEST);
      }
      if (!user.is_business && !isbusiness) {
        throw new HttpException('您已不是商家', HttpStatus.BAD_REQUEST);
      }
      return await this.userRepository.update(id, {
        is_business: isbusiness,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
