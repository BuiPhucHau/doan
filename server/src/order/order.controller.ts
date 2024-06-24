import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { DishService} from 'src/dish/dish.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    // private readonly orderdetailService: OrderdetailService,
    // private readonly dishService: DishService,
    ) {}
// post create a new order
  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const newOrder = await this.orderService.create(createOrderDto);
      return newOrder;
    } catch (error) {
      throw error;
    }
  }
// get all orders
  @Get('get-all')
  async findAll() {
    try {
      const orders = await this.orderService.findAll();
      return orders;
    } catch (error) {
      throw error;
    }
  }
// get order by id
  @Get('getbyOrderId')
  async findOne(@Query('id') id: string,uid: string) {
    try {
      const order = await this.orderService.findOne(id);
      return order;
    } catch (error) {
      throw error;
    }
  }
// put update order
  @Put('update')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const updatedOrder = await this.orderService.update(id, updateOrderDto);
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }
// delete order
  @Delete('delete')
  async remove(@Param('id') id: string) {
    try {
      const deletedOrder = await this.orderService.remove(id);
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  }
}
