import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Hotel } from '../entities/hotel.entity';
import { Room, RoomType } from '../entities/room.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'www.barteam.cn',
  port: 3306,
  username: 'root',
  password: 'Bar123456790.',
  database: 'ehotel_test',
  entities: [User, Hotel, RoomType, Room],
  synchronize: true,
  insecureAuth: true,
};

export default dbConfig;
