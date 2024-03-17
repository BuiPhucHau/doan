import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { StorageModule } from './storage/storage.module';
import { DishModule } from './dish/dish.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://phuchau0385:hau123@cluster0.2jkroxq.mongodb.net/'),

  CategoryModule,
  StorageModule,
  DishModule,
  UserModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
