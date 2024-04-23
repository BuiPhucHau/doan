import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({timestamps: true})
export class Reservation {
    @Prop({ required: true, unique: true })
    reservationId: string;
  
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

    @Prop()
    uId: string;

    @Prop({required: true})
    phone: string;

    @Prop({ required: true })
    status: boolean;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);