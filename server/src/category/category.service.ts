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
// create a new category
  async create (createCategoryDto: CreateCategoryDto): Promise<Category> {
    try{
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();  
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
// get all categories
  async findAll() {
    try{
      const categories = await this.categoryModel.find().exec();
      return categories;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
// get category by id
  async findOne(id: string) {
    try{
      const category = await this.categoryModel.findOne({categoryId: id}).exec();
      return category;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
// update category
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
  // delete category
    async remove(id: string) {
      try{
        const deletedCategory = await this.categoryModel.findOneAndDelete({categoryId: id});
        return deletedCategory;
      }
      catch(err){
        throw new HttpException(err.message, err.status);
      }
    }

}
