import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './modules/cars/controllers/cars.controller';
import { CarsService } from './modules/cars/services/cars.service';
import { BrandsController } from './modules/brands/controllers/brands.controller';
import { BrandsService } from './modules/brands/services/brands.service';

@Module({
  imports: [],
  controllers: [AppController, CarsController, BrandsController],
  providers: [AppService, CarsService, BrandsService],
})
export class AppModule {}
