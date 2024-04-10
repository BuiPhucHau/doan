import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const newPayment = await this.paymentService.create(createPaymentDto);
      return newPayment;
    } catch (error) {
      throw error;
    } 
  }

  @Get('get-all')
  async findAll() {
    try {
      const payments = await this.paymentService.findAll();
      return payments;
    } catch (error) {
      throw error;
    }
  }

  @Get('getbyPaymentId/:id')
  async findOne(@Param('id') id: string) {
    try {
      const payment = await this.paymentService.findOne(id);
      return payment;
    } catch (error) {
      throw error;
    }
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.paymentService.update(id, updatePaymentDto);
      return updatedPayment;
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const deletedPayment = await this.paymentService.remove(id);
      return deletedPayment;
    } catch (error) {
      throw error;
    }
  }
}
