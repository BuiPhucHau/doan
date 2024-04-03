import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';
import { DishService } from 'src/dish/dish.service';
@Controller('orderdetail')
export class OrderdetailController {
  constructor(
    private readonly orderdetailService: OrderdetailService,
    // private readonly dishService: DishService,
    ) { }

  @Post('create')
  async create(@Body() createOrderdetailDto: CreateOrderdetailDto) {
    try {
      const newOrderdetail = await this.orderdetailService.create(createOrderdetailDto);
      return newOrderdetail;
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      const orderdetails = await this.orderdetailService.findAll();
      return orderdetails;
    } catch (error) {
      throw error;
    }
  }

  @Get('getbyOrderDetailId')
  async findOne(@Param('id') id: string) {
    try {
      const orderdetail = await this.orderdetailService.findOne(id);
      return orderdetail;
    } catch (error) {
      throw error;
    }
  }

  @Put('update')
  async update(@Param('id') id: string, @Body() updateOrderdetailDto: UpdateOrderdetailDto) {
    try {
      const updatedOrderdetail = await this.orderdetailService.update(id, updateOrderdetailDto);
      return updatedOrderdetail;
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete')
  async remove(@Param('id') id: string) {
   try {
      const deletedOrderdetail = await this.orderdetailService.remove(id);
      return deletedOrderdetail;
    } catch (error) {
      throw error;
    } 
  }
}
