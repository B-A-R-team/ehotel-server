import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import dbConfig from '../../config/database.config';
import { HotelModule } from '../hotel/hotel.module';
import { RoomModule } from '../room/room.module';
import { RecordModule } from '../record/record.module';
import { ActiveModule } from '../active/active.module';
import { CouponModule } from '../coupon/coupon.module';
import { IntegralLogModule } from '../integral-log/integral-log.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from '../user/user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    MulterModule.register({
      storage: diskStorage({
        destination: `./public/upload`,
        filename: (req, file, cb) => {
          const filename = `${Date.now()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
    UserModule,
    HotelModule,
    RoomModule,
    RecordModule,
    ActiveModule,
    CouponModule,
    IntegralLogModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
