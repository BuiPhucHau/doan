import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { StorageModule } from './storage/storage.module';
import { DishModule } from './dish/dish.module';
import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';
import { TableModule } from './table/table.module';
import { LocationModule } from './location/location.module';
import { OrderModule } from './order/order.module';

import { NewModule } from './new/new.module';

import { BillModule } from './bill/bill.module';
import { PaymentMomoModule } from './paymentmomo/paymentmomo.module';

import { ConfigModule, ConfigService } from '@nestjs/config';;
// import { PaymentstripeModule } from './paymentstripe/paymentstripe.module';
import Stripe from 'stripe';


@Module({
  imports: [
    ConfigModule.forRoot(), // Make sure you have ConfigModule set up for environment variables
    MongooseModule.forRoot(
    'mongodb+srv://phuchau0385:buihau038@cluster0.giztluo.mongodb.net/'),
  CategoryModule,
  StorageModule,
  DishModule,
  UserModule,
  // AuthModule,
  ReservationModule,
  TableModule,
  LocationModule,
  OrderModule,
  NewModule,
  BillModule,
  PaymentMomoModule,
  // PaymentstripeModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
