import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';
import { Active } from './active.entity';
import { Coupon } from './coupon.entity';
import { Record } from './record.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  title: string;

  @Column('text')
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column('simple-array')
  swiperList: string[];

  @Column()
  open_time: string;

  @Column()
  end_time: string;

  @OneToMany(
    type => User,
    user => user.hotel,
  )
  owners: User[];

  @Column('text')
  desc: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(
    type => Room,
    room => room.hotel,
  )
  rooms: Room[];

  @OneToMany(
    type => Active,
    active => active.hotel,
  )
  actives: Active[];

  @OneToMany(
    type => Coupon,
    coupon => coupon.hotel,
  )
  coupons: Coupon[];

  @OneToMany(
    type => Record,
    record => record.hotel,
  )
  records: Record[];
}
