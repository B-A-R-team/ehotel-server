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

  async findVip() {
    try {
      return await this.userRepository.find({ is_vip: true });
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

  /**
   * 成为vip
   * @param id 用户id
   */
  async toVip(id: number) {
    try {
      return this.userRepository.update(id, { is_vip: true });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 增加余额
   * @param id 用户ID
   * @param money 金额
   */
  async increaseBalance(id: number, money: number) {
    try {
      const { paid_balance } = await this.findById(id);
      const newBalance = paid_balance + money;

      return this.userRepository.update(id, {
        paid_balance: newBalance,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 减少余额
   * @param id 用户ID
   * @param money 金额
   */
  async decreaseBalance(id: number, money: number) {
    try {
      const { paid_balance } = await this.findById(id);
      const newBalance = paid_balance - money;

      if (newBalance < 0) {
        throw '余额不足';
      }

      return this.userRepository.update(id, {
        paid_balance: newBalance,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 更改用户积分
   * @param id 用户ID
   * @param integral 积分
   */
  async changeIntegral(id: number, integral: number) {
    try {
      return this.userRepository.update(id, { integral });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 修改用户姓名
   * @param id 用户ID
   * @param name 用户姓名
   */
  async changeName(id: number, name: string) {
    try {
      return this.userRepository.update(id, { name });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 修改用户电话号
   * @param id 用户ID
   * @param phone 用户电话号
   */
  async changePhone(id: number, phone: string) {
    try {
      return this.userRepository.update(id, { phone });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(idList: number[]) {
    try {
      return this.userRepository.delete(idList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
