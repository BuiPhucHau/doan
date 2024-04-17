import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type NewDocument = HydratedDocument<New>;

@Schema({timestamps: true})
export class New {
    @Prop({required: true, unique: true})
    newId: string;

    @Prop({required: true})
    day: number;

    @Prop({required: true})
    month: string;

    @Prop({required: true})
    year: number;

    @Prop({required: true})
    news: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    text: string;

    @Prop({
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true})
    image: string;
     
}


export const NewSchema = SchemaFactory.createForClass(New);
