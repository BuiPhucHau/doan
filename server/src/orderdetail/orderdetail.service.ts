import { HttpException,Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orderdetail } from './entities/orderdetail.entity';
import { Model } from 'mongoose';
import { Dish } from 'src/dish/entities/dish.entity';
import { Order } from 'src/order/entities/order.entity';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';


@Injectable()
export class OrderdetailService {
  constructor(
    @InjectModel(Orderdetail.name) private readonly orderdetailModel: Model<Orderdetail>,
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>
  ){}

  async create(createOrderdetailDto: CreateOrderdetailDto): Promise<Orderdetail> {
    try{
      const createdOrderdetail = new this.orderdetailModel(createOrderdetailDto);
      return await createdOrderdetail.save();
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try{
      const orderdetails = await this.orderdetailModel.find()
      .populate('odId') 
    return orderdetails;
      
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
   try{
      const orderdetail = await this.orderdetailModel.findOne({odId : id})
      .populate('odId','userName', this.orderdetailModel)
      .exec();
      return orderdetail;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateOrderdetailDto: UpdateOrderdetailDto) {
   try{
      const updatedOrderdetail = await this.orderdetailModel.findOneAndUpdate({odId : id}, updateOrderdetailDto, {new: true});
      return updatedOrderdetail;
   }
    catch(err){
        throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    try{
      const deletedOrderdetail = await this.orderdetailModel.findOneAndDelete({odId : id}); 
      return deletedOrderdetail;
  }
  catch(err){
    throw new HttpException(err.message, err.status);
  }
  }
}
