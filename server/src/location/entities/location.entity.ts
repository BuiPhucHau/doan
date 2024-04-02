import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type LocationDocument = HydratedDocument<Location>;

@Schema({timestamps: true})
export class Location {
    @Prop({required: true, unique: true})
    locationId: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    phone: string;

   
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    })
    IlocationId: string;

    @Prop({
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true})
    image: string;
     
}


export const LocationSchema = SchemaFactory.createForClass(Location);
