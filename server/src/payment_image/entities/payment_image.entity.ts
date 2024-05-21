import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type PaymentImageDocument = HydratedDocument<PaymentImage>;
@Schema({ timestamps: true })
export class PaymentImage {
    @Prop({ required: true, unique: true })
    paymentImageId: string;
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true
    })
    paymentImage: string;
}
export const PaymentImageSChema = SchemaFactory.createForClass(PaymentImage);