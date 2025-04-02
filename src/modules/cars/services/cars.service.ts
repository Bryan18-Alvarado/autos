import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from '../dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  private readonly logger = new Logger('CarsService');

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  findAll() {
    return this.carRepository.find({});
  }

  async create(createCarDto: CreateCarDto) {
    try {
      const car = this.carRepository.create(createCarDto);
      await this.carRepository.save(car);
      return car;
    } catch (error) {
      //   console.error(error);
      //   throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    await this.carRepository.remove(car);
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`carro con id ${id} no encontrado`);
    }
    return car;
  }
  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Ocurrió un error inesperado. Intente más tarde',
    );
  }
}
