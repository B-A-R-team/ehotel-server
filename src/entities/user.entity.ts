import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { IntegralLog } from './integral_log.entity';
import { Coupon } from './coupon.entity';
import { type } from 'os';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 8, nullable: true })
  name: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  pass: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ type: 'boolean', default: false })
  is_business: boolean;

  @Column({ type: 'boolean', default: false })
  is_vip: boolean;

  @Column({ default: 0.0 })
  paid_balance: number;

  @Column({ default: 0.0 })
  free_balance: number;

  @Column({ nullable: true })
  openid: string;

  @Column({ length: 18, nullable: true })
  person_id: string;

  @Column({ type: 'int', nullable: true })
  login_hotel_id: number;

  @Column({ nullable: true })
  token: string;

  @Column({ default: 0 })
  integral: number;

  @ManyToOne(
    type => Hotel,
    hotel => hotel.owners,
  )
  hotel: Hotel;

  @OneToMany(
    type => IntegralLog,
    integralLog => integralLog.user,
  )
  integralLogs: IntegralLog[];

  @OneToMany(
    type => Coupon,
    coupon => coupon.user,
  )
  coupons: Coupon[];
}
