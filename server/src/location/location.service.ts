import { HttpException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './entities/location.entity';
import { Storage } from 'src/storage/entities/storage.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
  ) {}
// create a new location
  async create(createLocationDto: CreateLocationDto) {
    try {
      const createdLocation = new this.locationModel(createLocationDto);
      return await createdLocation.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
// get location by name
  async getByName(name: string) {
    try {
      const location = await this.locationModel.findOne({ name: name }).exec();
      if(location._id.toString.length > 0){
        return location;
      }
      else{
        return {
          _id: '500'
        }
      }
    }
      catch(err) {  
        return {
          _id: '500'
        }
      }
  }
// get all locations
  async findAll() {
    try {
      const locations = await this.locationModel.find()
      .populate('image','urls', this.storageModel)
      .exec();
      return locations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

// get location by id
  async findOne(locationId: string) {
    try{
      const location = await this.locationModel.findOne({locationId: locationId})
      return location;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
// update location
  async update(id: string, updateLocationDto: UpdateLocationDto) {
    try{
      const updatedLocation = await this.locationModel.findOneAndUpdate(
        {locationId: id},
        {...updateLocationDto},
        {new: true}
      );
      return updatedLocation;
  }
  catch(err) {
    throw new HttpException(err.message, err.status);
  }
}
// delete location
  async remove(id: string) {
    try{
      const deletedLocation = await this.locationModel.findOneAndDelete({locationId: id});
      return deletedLocation;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
   
}