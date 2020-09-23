import { Hotel } from './hotel.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Active {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  topic: string;

  @Column({ length: 'MAX' })
  img_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @Column()
  start_time: string;
  @Column()
  end_time: string;

  @Column({ type: 'text', length: 'MAX' })
  detail: string;

  @Column({ type: 'text' })
  desc: string;

  @ManyToOne(
    type => Hotel,
    hotel => hotel.actives,
  )
  hotel: Hotel;
}
