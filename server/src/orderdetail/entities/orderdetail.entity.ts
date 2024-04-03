import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import { Dish } from 'src/dish/entities/dish.entity';
export type OrderdetailDocument = HydratedDocument<Orderdetail>;
@Schema({timestamps: true})
export class Orderdetail {
    @Prop({required: true, unique: true})
    odId: string;

    @Prop({required: true})
    oId: string;
    
    @Prop({required: true})
    dId: string;

    @Prop({required: true})
    uid: string;

    @Prop()
    distList: Dish[];

    @Prop({required: true})
    quantity: number;
    
    @Prop({required: true})
    price: number;

    @Prop({required: true})
    total: number;


}

export const OrderdetailSchema = SchemaFactory.createForClass(Orderdetail);