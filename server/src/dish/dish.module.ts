import { Module, forwardRef } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DishSchema } from './entities/dish.entity';
import { CategorySchema } from 'src/category/entities/category.entity';
import { StorageSchema } from 'src/storage/entities/storage.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Dish', schema: DishSchema},
    {name: 'Category', schema: CategorySchema},
    {name: 'Storage', schema: StorageSchema}
    ]),
    forwardRef(() => CategoryModule),
  ],
  providers: [DishService],   
  controllers: [DishController],
  exports: [DishService]
})
export class DishModule {}
