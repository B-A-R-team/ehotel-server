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

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToOne(
    type => Hotel,
    hotel => hotel.coupons,
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
