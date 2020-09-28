import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class IntegralLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  is_out: boolean;

  @Column()
  sell_count: number;

  @Column({ nullable: true })
  remarks: string;

  @ManyToOne(
    type => User,
    user => user.integralLogs,
  )
  user: User;
}
