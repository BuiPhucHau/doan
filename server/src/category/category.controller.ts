import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
// create a new category
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return newCategory;
    } catch (err) {
      throw err;
    }
  }
// get all categories
  @Get('get-all')
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return categories;
    } catch (err) {
      throw err;
    }
  }
// get category by id
  @Get()
  async findOne(@Query('id') id: string) {
    try{
      const category = await this.categoryService.findOne(id);
      return category;
    }
    catch(err){
      throw err;
    }
  }
// update category
  @Put('update')
  async update(@Query('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try{
      const newCategory = await this.categoryService.update(id, updateCategoryDto);
      return newCategory;
    }
    catch(err){
      throw err;
    }
  }
// delete category
  @Delete('delete')
  async remove(@Query('id') id: string) {
    try{
      const deletedCategory = await this.categoryService.remove(id);
      return deletedCategory;
    }
    catch(err){
      throw err;
    }
  }
}
