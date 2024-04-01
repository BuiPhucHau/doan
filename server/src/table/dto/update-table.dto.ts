import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';
import { Types } from 'mongoose';

export class UpdateTableDto extends PartialType(CreateTableDto) {
    reservationId?: Types.ObjectId;
}
