import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { Record } from './record.entity';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  type_name: string;

  @Column('simple-array')
  floor: string[];

  @Column('double')
  area: number;

  @OneToMany(
    type => Room,
    room => room.type,
  )
  rooms: Room[];
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  is_used: boolean;

  @ManyToOne(
    type => RoomType,
    roomType => roomType.rooms,
  )
  type: RoomType;

  @Column('nvarchar')
  title: string;

  @Column({ type: 'nvarchar', unique: true })
  room_num: string;

  @Column({ type: 'int', default: 2 })
  max_count: number;

  @ManyToOne(
    type => Hotel,
    hotel => hotel.rooms,
  )
  hotel: Hotel;

  @Column()
  old_price: number;

  @Column()
  new_price: number;

  @Column('text')
  desc: string;

  @Column({ length: 2048 })
  img_url: string;

  @Column({ length: 4096 })
  room_info: string;

  @Column({ length: 4096 })
  computer_info: string;

  @OneToMany(type => Record, record => record.room)
  records: Record[];
}
