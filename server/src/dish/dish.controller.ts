import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';

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
    
}
