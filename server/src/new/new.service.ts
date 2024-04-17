import { HttpException, Injectable } from '@nestjs/common';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { New } from './entities/new.entity';
import { Storage } from 'src/storage/entities/storage.entity';

@Injectable()
export class NewService {
 
  constructor(
       @InjectModel(New.name) private readonly newModel: Model<New>,
       @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
  ) {}


  async create(createNewDto: CreateNewDto) {
    try {
      const createdNew = new this.newModel(createNewDto);
      return await createdNew.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

async findAll() {
    try {
      const news = await this.newModel.find()
      .populate('image','urls', this.storageModel)
      .exec();
      return news;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: any) {
    try{
      const news = await this.newModel.findOne({newId: id}).exec();
      return news ;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateNewDto: UpdateNewDto) {
    try{
      const updatedNew = await this.newModel.findOneAndUpdate(
        {locationId: id},
        {...updateNewDto},
        {new: true}
      );
      return updatedNew;
  }
  catch(err) {
    throw new HttpException(err.message, err.status);
  }
}


async remove(id: string) {
  try{
    const deletedNew = await this.newModel.findOneAndDelete({newId: id});
    return deletedNew;
  }
  catch(err){
    throw new HttpException(err.message, err.status);
  }
}



}
