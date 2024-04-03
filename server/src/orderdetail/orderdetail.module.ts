import { Module,forwardRef } from '@nestjs/common';
import { DishService } from 'src/dish/dish.service';
import { DishModule } from 'src/dish/dish.module';
import { DishSchema } from 'src/dish/entities/dish.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderdetailSchema } from './entities/orderdetail.entity';
import { OrderdetailService } from './orderdetail.service';
import { OrderdetailController } from './orderdetail.controller';
import { OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Orderdetail', schema: OrderdetailSchema},
    {name: 'Dish', schema: DishSchema},
    {name: 'Order', schema: OrderSchema}
  ]),
  ],
  controllers: [OrderdetailController],
  providers: [OrderdetailService],
})
export class OrderdetailModule {}
