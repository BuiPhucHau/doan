import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import {Dish} from 'src/dish/entities/dish.entity';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>,
  
  ){}
// create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return await createdOrder.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// get all orders
  async findAll() {
    try {
      const orders = await this.orderModel.find()
      // .populate('uid','name', this.orderModel)
      .exec();
      return orders;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    } 
  }
// get order by id
  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id)
      // .populate('id', this.orderModel)
      .exec();
      return order;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// update order
  async update(id: string, updateOrderDto: UpdateOrderDto) {
   try {
      const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true});  
      return updatedOrder;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// delete order
  async remove(id: string) {
    try {
      const deletedOrder = await this.orderModel.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
