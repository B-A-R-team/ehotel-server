import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegralLog } from '../../entities/integral_log.entity';
import { CreateIntegralLogDto } from './integral-log.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class IntegralLogService {
  constructor(
    @InjectRepository(IntegralLog)
    private readonly integralLogRepository: Repository<IntegralLog>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      return await this.integralLogRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number) {
    try {
      return await this.integralLogRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUserId(userId: number) {
    try {
      const user = await this.userService.findById(userId);
      return await this.integralLogRepository.find({ user });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTotalIntegral(id: number) {
    try {
      const logs = await this.findByUserId(id);

      let totalIntegral = 0;
      if (logs.length > 0) {
        logs.forEach(log => {
          if (log.is_out) {
            totalIntegral -= log.sell_count;
          } else {
            totalIntegral += log.sell_count;
          }
        });
      }

      return totalIntegral;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createIntegralLog: CreateIntegralLogDto) {
    try {
      const { user_id, ...integralLogInfo } = createIntegralLog;
      const user = await this.userService.findById(user_id);

      if (integralLogInfo['is_out']) {
        user['integral'] -= integralLogInfo.sell_count;
      } else {
        user['integral'] += integralLogInfo.sell_count;
      }

      integralLogInfo['user'] = user;
      await this.userService.changeIntegral(user['id'], user['integral']);
      return await this.integralLogRepository.save(integralLogInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      return await this.integralLogRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
