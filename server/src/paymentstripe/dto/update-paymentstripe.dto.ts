import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentstripeDto } from './create-paymentstripe.dto';

export class UpdatePaymentstripeDto extends PartialType(CreatePaymentstripeDto) {}
