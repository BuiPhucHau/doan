import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './entities/payment.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { OrderSchema } from 'src/order/entities/order.entity';
import { DishSchema } from 'src/dish/entities/dish.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Payment', schema: PaymentSchema},
    {name: 'User', schema: UserSchema},
    {name: 'Order', schema: OrderSchema},
    {name: 'Dish', schema: DishSchema},
  ]),
  ],
  exports: [PaymentService],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
