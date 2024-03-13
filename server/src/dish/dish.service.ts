import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { CreateDishDto } from './dto/create-dish.dto';

@Injectable()
export class DishService {
    
 constructor(
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
 ){}

 async create (createCarDto: CreateDishDto): Promise<Dish> {
    try{
        const createdDish = new this.dishModel(createCarDto);
        return await createdDish.save();
    }
    catch(err){
        throw new HttpException(err.message, err.status);
    }
 }
 async findAll() {
    try{
      const cars = await this.dishModel.find()
      .populate('image','urls', this.storageModel)
      .populate('categoryId','name', this.categoryModel)
      .exec();
      return cars;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

}
