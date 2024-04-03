import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import { Dish } from 'src/dish/entities/dish.entity';
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
export type OrderDocument = HydratedDocument<Order>;
@Schema({timestamps: true})
export class Order {
    @Prop({required: true, unique: true})
    oId: string;
    
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    uid: string;
    
    @Prop()
    dishList: Dish[];
    
    @Prop({required: true})
    orderDate: Date;
    
    @Prop({required: true})
    total: number;
    
    @Prop({required: true})
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
