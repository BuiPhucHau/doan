import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentImageDto } from './create-payment_image.dto';

export class UpdatePaymentImageDto extends PartialType(CreatePaymentImageDto) {}
