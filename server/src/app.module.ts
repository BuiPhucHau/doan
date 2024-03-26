import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { StorageModule } from './storage/storage.module';
import { DishModule } from './dish/dish.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://phuchau0385:buihau038@cluster0.giztluo.mongodb.net/'),

  CategoryModule,
  StorageModule,
  DishModule,
  UserModule,
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
