import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try{
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();  
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try{
      const categories = await this.categoryModel.find().exec();
      return categories;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try{
      const category = await this.categoryModel.findOne({categoryId: id}).exec();
      return category;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try{
      const updatedCategory = await this.categoryModel.findOneAndUpdate(
        {categoryId: id},
        {...updateCategoryDto},
        {new: true}
      );
      return updatedCategory;
  }
  catch(err) {
    throw new HttpException(err.message, err.status);
  }
}
  
    async remove(id: string) {
      try{
        const deletedDish = await this.categoryModel.findOneAndDelete({categoryId: id});
        return deletedDish;
      }
      catch(err){
        throw new HttpException(err.message, err.status);
      }
    }

}
