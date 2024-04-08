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

    @Post('create')
    async create(@Body() createDishDto: CreateDishDto) {
        try {
            const newDish = await this.dishService.create(createDishDto);
            return newDish;
        } catch (error) {
            throw error;
        }
    }

    @Get('get-all')
    async findAll() {
        try {
            const dishes = await this.dishService.findAll();
            return dishes;
        } catch (error) {
            throw error;
        }
    }

    @Get('getbyDishId')
    async findOne(@Query('id') id: string ) {
        try {
            const dish = await this.dishService.findOne(id);
            return dish;
        } catch (error) {
            throw error;
        }
    }

    @Put('update')
    async update(@Query('id') id: string, @Body() updateDishDto: UpdateDishDto) {
        try {
            const updatedDish = await this.dishService.update(id, updateDishDto);
            return updatedDish;
        } catch (error) {
            throw error;
        }
    }

    @Put('status')
    async updateStatus(@Body() updateStatusDto: UpdateStatusDto, @Query('status') status: boolean) {
        try {
            const { ids } = updateStatusDto;
        
            const updateDishes = await Promise.all(
              ids.map(async (id) => {
                const updatedCar = await this.dishService.updateStatus(id, status);
                return updatedCar;
              })
            );
            return updateDishes;
          } catch (err) {
            throw err;
          }
        }

    // @Put('isComfirmed')
    // async updateIsComfirmed(@Query('id') id: string, @Body() isConfirmed: any) {
    //     try {
    //         const updatedDish = await this.dishService.updateIsConfirmed(id, isConfirmed.status);
    //         await this.categoryService.increase(updatedDish.cId);
    //         return  updatedDish;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
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
