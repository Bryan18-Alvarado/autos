import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from '../dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../entities/car.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CarsService {
  private readonly logger = new Logger('CarsService');

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  findAll(PaginationDto: PaginationDto) {
    const { limit = 3, offset = 0 } = PaginationDto;
    return this.carRepository.find({
      take: limit,
      skip: offset,
    });
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

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepository.findOne({ where: { id } });

    if (!car) {
      throw new NotFoundException(`carro con id ${id} no encontrado`);
    }
    if (!car) {
      throw new NotFoundException(`carro con id ${id} no encontrado`);
    }
    try {
      this.carRepository.merge(car, updateCarDto);
      await this.carRepository.save(car);
      return {
        message: 'registro actualizado con éxito',
        data: car,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  // async remove(id: number) {
  //   const car = await this.findOne(id);
  //   await this.carRepository.remove(car);
  //   return `carro con id ${id} fue eliminado`;
  // }

  async remove(id: number) {
    const exists = await this.carRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`carro con id ${id} no encontrado`);
    }
    await this.carRepository.softDelete({ id }); //softDelete es como una eliminacion completa, pero en esta te queda la fecha
    return {
      message: `Auto con ID ${id} eliminado con exito`,
      deleteAt: new Date(),
    };
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
