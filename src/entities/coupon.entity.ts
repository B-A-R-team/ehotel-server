import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.entity';
import { User } from './user.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  label: string;

  @Column({ type: 'boolean', default: true })
  is_full_down: boolean;

  @Column({ nullable: true })
  limit_price: number;

  @Column()
  reduce_price: number;

  @Column('timestamp')
  start_time: Date;

  @Column('timestamp')
  end_time: Date;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToOne(
    type => Hotel,
    hotel => hotel.coupon,
  )
  hotel: Hotel;

  @ManyToOne(
    type => User,
    user => user.coupons,
  )
  user: User;

  @Column({ type: 'boolean', default: false })
  is_used: boolean;
}
