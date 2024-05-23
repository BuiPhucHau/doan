import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import { Dish } from 'src/dish/entities/dish.entity';
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
export type OrderDocument = HydratedDocument<Order>;
@Schema({timestamps: true})
export class Order {
    @Prop()
    reservationId: string;
    @Prop({required: true, unique: true})
    orderId: number;
    @Prop({required: true})
    orderName: string;
    @Prop({required: true})
    orderPhone: string;
    @Prop({required: true})
    orderAddress: string;
    @Prop({required: true})
    orderEmail: string;
    @Prop({required: true})
    orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
