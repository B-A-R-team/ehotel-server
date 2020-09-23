import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import dbConfig from './config/database.config';
import { HotelModule } from './modules/hotel/hotel.module';
import { RoomModule } from './modules/room/room.module';
import { RecordModule } from './modules/record/record.module';
import { ActiveModule } from './modules/active/active.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { IntegralLogModule } from './modules/integral-log/integral-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    HotelModule,
    RoomModule,
    RecordModule,
    ActiveModule,
    CouponModule,
    IntegralLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
