import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type PaymentDocument = HydratedDocument<Payment>;
@Schema({timestamps: true})
export class Payment {
    @Prop({required: true, unique: true})
    paymentId: string;
    @Prop({required: true})
    reservationId: string;
    @Prop({required: true})
    tableId: string;
    @Prop({required: true})
    oId: string;
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    uid: string;
    @Prop({required: true})
    paymentDate: Date;
    @Prop({required: true})
    paymentTotal: number;
    @Prop()
    dishList: string[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);