import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
// create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser  = new this.userModel(createUserDto);
      return await newUser .save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// get all users
  async findAll() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// get user by id
  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ uid: id }).exec();
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// get user by email
  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();
      if (!user) {
        let userClone = {
          _id: '404 user not found',
          uid: '404 user not found',
          email: '404 user not found',
          password: '404 user not found',
         
        };
        return userClone;
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // Get user by email and password
  async findByEmailAndPassword(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email: email, password: password }).exec();
      
      if (!user) {
        let userClone = {
          _id: '404 user not found',
          uid: '404 user not found',
          email: '404 user not found',
          password: '404 user not found',
         
        };
        return userClone;
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// update user
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
// delete user
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
