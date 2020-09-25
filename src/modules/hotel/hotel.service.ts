import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../../entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async findAll() {
    return await this.hotelRepository.find();
  }

  async create(hotel: Hotel) {
    return await this.hotelRepository.save(hotel);
  }
}
