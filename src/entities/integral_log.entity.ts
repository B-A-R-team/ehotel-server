import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(
    type => User,
    user => user.integralLogs,
  )
  @JoinTable()
  users: User[];
}
