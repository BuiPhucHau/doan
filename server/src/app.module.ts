import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://phuchau0385:<hau123>@cluster0.2jkroxq.mongodb.net/'), CategoryModule, StorageModule],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
