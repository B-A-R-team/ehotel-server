import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.entity';

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

  @ManyToMany(
    type => Hotel,
    hotel => hotel.coupons,
  )
  hotels: Hotel[];
}
