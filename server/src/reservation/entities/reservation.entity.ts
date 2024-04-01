import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({timestamps: true})
export class Reservation {
    @Prop({ required: true, unique: true })
    rId: string;
  
    @Prop({ required: true })
    name: string;
    
    @Prop({required: true})
    numberofPeople: number;

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    time: string;

    @Prop({required: true})
    tableId: string;

    @Prop({required: true})
    uId: string;

    @Prop({required: true})
    
    phone: string;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);