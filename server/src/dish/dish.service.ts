import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Storage } from 'src/storage/entities/storage.entity';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
  ) {}
// create a new dish
  async create(createDishDto: CreateDishDto): Promise<Dish> {
    try {
      const createdDish = new this.dishModel(createDishDto);
      return await createdDish.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
// get all dishes
  async findAll() {
    try {
      const dishes = await this.dishModel
        .find()
        .populate('image', 'urls', this.storageModel)
        .exec();
      return dishes;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
// get image by objectId
  async findByObjectId(objectId: string) {
    try {
      const dishes = await this.dishModel
        .findById(objectId)
        .populate('image', 'urls', this.storageModel)
        .populate('cId', 'nameCategory', this.categoryModel)
        .exec();
      return dishes;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
// get dish by id
  async findOne(dId: string) {
    try {
      const dish = await this.dishModel.findOne({ dId: dId });
      return dish;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
// update dish
  async update(id: string, updateDishDto: UpdateDishDto) {
    try {
      const updatedDish = await this.dishModel.findOneAndUpdate(
        { dId: id },
        { ...updateDishDto },
        { new: true },
      );
      return updatedDish;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
//delete dish
  async remove(id: string) {
    try {
      const deletedDish = await this.dishModel.findOneAndDelete({ dId: id });
      return deletedDish;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
