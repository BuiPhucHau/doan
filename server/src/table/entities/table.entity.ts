import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TableDocument = HydratedDocument<Table>;

@Schema({ timestamps: true })
export class Table {
  @Prop({ required: true })
  tableId: string;

  @Prop({ required: true })
  tableName: string;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  setdishes: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',

  })
  reservationId?: string;

  @Prop ({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  })
  locationId: string;


}

export const TableSchema = SchemaFactory.createForClass(Table);
