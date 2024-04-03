import { Module,forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DishSchema } from 'src/dish/entities/dish.entity';
import { CategorySchema } from 'src/category/entities/category.entity';
import { OrderSchema } from './entities/order.entity';
import { OrderdetailSchema } from 'src/orderdetail/entities/orderdetail.entity';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/entities/user.entity';
@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Order', schema: OrderSchema},
    {name: 'Dish', schema: DishSchema},
    {name: 'Category', schema: CategorySchema},
    {name: 'Orderdetail', schema: OrderdetailSchema},
    {name: 'User', schema: UserSchema},
  ]),
  forwardRef(() => UserModule),
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
