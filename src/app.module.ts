import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './modules/cars/controllers/cars.controller';
import { CarsService } from './modules/cars/services/cars.service';
import { BrandsController } from './modules/brands/controllers/brands.controller';
import { BrandsService } from './modules/brands/services/brands.service';
import { CarsModule } from './modules/cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CarsModule,
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    CommonModule,
  ],
  controllers: [AppController, CarsController, BrandsController],
  providers: [AppService, CarsService, BrandsService],
})
export class AppModule {}
