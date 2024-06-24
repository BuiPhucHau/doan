import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { UpdateStatusDto } from './dto/update-status-dish.dto';

@Controller('dish')
export class DishController {
    constructor(
        private categoryService: CategoryService,
        private dishService: DishService,
    ) {}
// post a new dish
    @Post('create')
    async create(@Body() createDishDto: CreateDishDto) {
        try {
            const newDish = await this.dishService.create(createDishDto);
            return newDish;
        } catch (error) {
            throw error;
        }
    }
// get all dishes
    @Get('get-all')
    async findAll() {
        try {
            const dishes = await this.dishService.findAll();
            return dishes;
        } catch (error) {
            throw error;
        }
    }
// get dish by id
    @Get('getbyDishId')
    async findOne(@Query('dId') dId: string ) {
        try {
            const dish = await this.dishService.findOne(dId);
            return dish;
        } catch (error) {
            throw error;
        }
    }
// update dish
    @Put('update')
    async update(@Query('id') id: string, @Body() updateDishDto: UpdateDishDto) {
        try {
            const updatedDish = await this.dishService.update(id, updateDishDto);
            return updatedDish;
        } catch (error) {
            throw error;
        }
    }
// delete dish  
    @Delete('delete')
    async remove(@Query('id') id: string) {
        try {
            const deletedDish = await this.dishService.remove(id);
            return deletedDish;
        } catch (error) {
            throw error;
        }
    }

}
