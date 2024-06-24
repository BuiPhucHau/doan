import { Controller, Get, Post, Body, Patch, Param, Delete ,Query,Put} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  // post create a new location
  @Post('create')
  async create(@Body() createLocationDto: CreateLocationDto) {
    try {
      const newLocation = await this.locationService.create(createLocationDto);
      return newLocation;
    } catch (err) {
        throw err
    }
  }
// get all locations
  @Get('get-all')
  async findAll() {
    try {
      const locations = await this.locationService.findAll();
      return locations;
    } catch (err) {
      throw err;
    }
  }
// get location by id
  @Get('getByLocationId') 
  async findOne(@Query('locationId') locationId: string) {
    try {
      const location = await this.locationService.findOne(locationId);
      return location;
    } catch (err) {
      throw err;
    }
  }
// update location
  @Put('update')
  async update(@Query('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    try{
      const updatedLocation = await this.locationService.update(id, updateLocationDto);
      return updatedLocation;
    }
    catch(err){
      throw err;
    }
  }
// delete location
  @Delete('delete')
  async remove(@Query('id') id: string) {
    try{
      const deletedLocation = await this.locationService.remove(id);
      return deletedLocation;
    }
    catch(err){
      throw err;
    }
  }
}