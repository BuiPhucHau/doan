import { Injectable } from '@nestjs/common';
import { CreatePaymentImageDto } from './dto/create-payment_image.dto';
import { UpdatePaymentImageDto } from './dto/update-payment_image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentImage } from './entities/payment_image.entity';
import { HttpException } from '@nestjs/common';
import { Storage } from 'src/storage/entities/storage.entity';

@Injectable()

export class PaymentImageService {
constructor(
    @InjectModel(PaymentImage.name) private readonly paymentImageModel: Model<PaymentImage>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
){}
async create(createPaymentImageDto: CreatePaymentImageDto) {
    try {
        const newPaymentImage = new this.paymentImageModel(createPaymentImageDto);
        return await newPaymentImage.save();
    } catch (error) {
        throw error;
    }
}
async findAll() {
  try{
    const paymentImages = await this.paymentImageModel.find()
    .populate('paymentImage',' urls', this.storageModel)
    .exec();
    return paymentImages;
  }
  catch(err){
    throw new HttpException(err.message, err.status);
  }
}

 
}
