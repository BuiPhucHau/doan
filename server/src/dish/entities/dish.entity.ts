import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

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

    @Prop({required: true})
    category: Category;

    @Prop({
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true})
    image: string;

    @Prop({required: true})
    featured: boolean;

    @Prop({required: true})
    quantity: number;
}

export const DishSchema = SchemaFactory.createForClass(Dish);