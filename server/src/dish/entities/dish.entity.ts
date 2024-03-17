import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

export type DishDocument = HydratedDocument<Dish>;
@Schema({timestamps: true})
export class Dish {
    @Prop({required: true, unique: true})
    dId: string;
    
    @Prop({required: true})
    nameDish: string;
    
    @Prop({required: true})
    price: number;
    
    @Prop({required: true})
    description: string;

    
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    })
    cId: string;

    @Prop({
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true})
    image: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);