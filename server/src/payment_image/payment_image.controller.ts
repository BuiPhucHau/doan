import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentImageService } from './payment_image.service';
import { CreatePaymentImageDto } from './dto/create-payment_image.dto';
import { UpdatePaymentImageDto } from './dto/update-payment_image.dto';

@Controller('payment-image')
export class PaymentImageController {
  constructor(private readonly paymentImageService: PaymentImageService) {}

  @Post('create')
  async create(@Body() createPaymentImageDto: CreatePaymentImageDto) {
    try {
      const newPaymentImage = await this.paymentImageService.create(createPaymentImageDto);
      return newPaymentImage;
    } catch (error) {
      throw error;
    } 
  }

  @Get('get-all')
  async findAll() {
    try {
      const paymentImages = await this.paymentImageService.findAll();
      return paymentImages;
    } catch (error) {
      throw error;
    }
  }
}
