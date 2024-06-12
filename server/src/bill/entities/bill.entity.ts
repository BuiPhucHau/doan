import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type BillDocument = HydratedDocument<Bill>;

@Schema({ timestamps: true })
export class Bill {

    @Prop({ required: true, unique: true })
    BillId: string;

    // @Prop({
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Voucher'
    // })
    // Voucher: string;
    @Prop()
    dishList: [];
    @Prop()
    TableId: string;
    @Prop()
    OrderId: string;
    @Prop()
    Total: number;

    // @Prop({required: true})
    // Discount: number;

    @Prop()
    QuantityTotal: number;

    @Prop()
    DatePayment: Date;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

