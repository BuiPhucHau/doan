import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ uid: id }).exec();
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();
      if (!user) {
        let userClone = {
          _id: '404 user not found',
          uid: '404 user not found',
          email: '404 user not found',
          password: '404 user not found',
          name: '404 user not found',
          avatar: '404 user not found',
          phone: '404 user not found',
          Adress: '404 user not found',
          role: '404 user not found',
        };
        return userClone;
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate(
          { uid: id }, 
          {...updateUserDto}, 
          { new: true });
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try{
      const deletedUser = await this.userModel.findOneAndDelete({uid: id});
      return deletedUser;
    }
    catch(err){
      throw new HttpException(err.message, err.status)
    }
  }
}
