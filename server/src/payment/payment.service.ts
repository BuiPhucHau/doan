import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const createdPayment = new this.paymentModel(createPaymentDto);
      return await createdPayment.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const payments = await this.paymentModel.find()
      // .populate('uid','name', this.paymentModel)
      .exec();
      return payments;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const payment = await this.paymentModel.findById(id)
      // .populate('id', this.paymentModel)
      .exec();
      return payment;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, {new: true});  
      return updatedPayment;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedPayment = await this.paymentModel.findByIdAndDelete(id);
      return deletedPayment;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
