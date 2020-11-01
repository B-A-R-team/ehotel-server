import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Hotel } from '../entities/hotel.entity';
import { Room, RoomType } from '../entities/room.entity';
import { Record } from '../entities/record.entity';
import { IntegralLog } from '../entities/integral_log.entity';
import { Coupon } from '../entities/coupon.entity';
import { Active } from '../entities/active.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'www.xxxx.cn',
  port: 3306,
  username: 'xxxx',
  password: 'xxxx.',
  database: 'ehotel_test',
  entities: [
    User,
    Hotel,
    RoomType,
    Room,
    Record,
    IntegralLog,
    Hotel,
    Coupon,
    Active,
  ],
  synchronize: true,
  insecureAuth: true,
};

export default dbConfig;
