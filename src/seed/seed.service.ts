import { Injectable } from '@nestjs/common';
import { CarsService } from '../modules/cars/services/cars.service';
import { initialData } from './data/seed-data';
import { Car } from 'src/modules/cars/entities/car.entity';
import { BrandsService } from 'src/modules/brands/services/brands.service';
import { Brand } from 'src/modules/brands/entities/brand.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  async runSeedCars() {
    await this.insertNewCars();

    return 'SEED CARS EXECUTED';
  }

  async runSeedBrands() {
    await this.insertNewBrands();

    return 'SEED BRANDS EXECUTED';
  }

  private async insertNewCars() {
    await this.carsService.deleteAllCars();

    const cars = initialData.cars;
    const insertPromises: Promise<Car | undefined>[] = [];
    cars.forEach((car) => {
      insertPromises.push(this.carsService.create(car));
    });
    await Promise.all(insertPromises);
    return true;
  }

  private async insertNewBrands() {
    await this.brandsService.deleteAllBrands();
    const brands = initialData.brands;
    const insertPromises: Promise<Brand | undefined>[] = [];
    brands.forEach((brand) => {
      insertPromises.push(this.brandsService.create(brand));
    });
    await Promise.all(insertPromises);

    return true;
  }
}
